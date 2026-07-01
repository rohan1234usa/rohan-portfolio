import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const ipHits = new Map<string, { count: number; reset: number }>();

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

    const gmailUser = process.env.GMAIL_USER;
    const gmailPass = process.env.GMAIL_APP_PASSWORD;
    if (!gmailUser || !gmailPass) {
        console.error("Contact form: GMAIL_USER / GMAIL_APP_PASSWORD not configured");
        return NextResponse.json({ error: "Mail service is not configured." }, { status: 500 });
    }

    // Where the notification lands. Defaults to the sending Gmail inbox.
    const toEmail = process.env.CONTACT_TO_EMAIL ?? gmailUser;

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: { user: gmailUser, pass: gmailPass },
    });

    try {
        await transporter.sendMail({
            // Gmail requires the authenticated account as the sender; the visitor is set as reply-to.
            from: `"Portfolio Contact" <${gmailUser}>`,
            to: toEmail,
            replyTo: `"${name}" <${email}>`,
            subject: `Portfolio contact from ${name}`,
            text: `From: ${name} <${email}>\n\n${message}`,
        });

        return NextResponse.json({ ok: true });
    } catch (err) {
        console.error("Contact route mail error:", err);
        return NextResponse.json({ error: "Failed to send. Please try again." }, { status: 502 });
    }
}
