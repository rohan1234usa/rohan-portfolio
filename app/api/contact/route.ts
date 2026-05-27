import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const ipHits = new Map<string, { count: number; reset: number }>();

const TO_EMAIL = "rohans9@uci.edu";
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>";

function rateLimited(ip: string) {
    const now = Date.now();
    const entry = ipHits.get(ip);
    if (!entry || now > entry.reset) {
        ipHits.set(ip, { count: 1, reset: now + RATE_LIMIT_WINDOW_MS });
        return false;
    }
    if (entry.count >= RATE_LIMIT_MAX) return true;
    entry.count += 1;
    return false;
}

export async function POST(req: NextRequest) {
    const ip =
        req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
        req.headers.get("x-real-ip") ??
        "unknown";

    if (rateLimited(ip)) {
        return NextResponse.json({ error: "Too many requests. Try again later." }, { status: 429 });
    }

    let body: { name?: string; email?: string; message?: string; website?: string };
    try {
        body = await req.json();
    } catch {
        return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    if (body.website && body.website.length > 0) {
        return NextResponse.json({ ok: true });
    }

    const name = body.name?.trim();
    const email = body.email?.trim();
    const message = body.message?.trim();

    if (!name || !email || !message) {
        return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    if (message.length > 5000 || name.length > 200) {
        return NextResponse.json({ error: "Submission too long." }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
        console.error("Contact form: RESEND_API_KEY not configured");
        return NextResponse.json({ error: "Mail service is not configured." }, { status: 500 });
    }

    const resend = new Resend(apiKey);

    try {
        const { error } = await resend.emails.send({
            from: FROM_EMAIL,
            to: TO_EMAIL,
            replyTo: email,
            subject: `Portfolio contact from ${name}`,
            text: `From: ${name} <${email}>\n\n${message}`,
        });

        if (error) {
            console.error("Resend error:", error);
            return NextResponse.json({ error: "Failed to send. Please try again." }, { status: 502 });
        }

        return NextResponse.json({ ok: true });
    } catch (err) {
        console.error("Contact route exception:", err);
        return NextResponse.json({ error: "Unexpected error. Please try again." }, { status: 500 });
    }
}
