import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { BRAND, loadGoogleFont, usableFonts } from "@/lib/og";

export const alt = "Rohan Singh — AI/ML & Full-Stack Engineer, CS @ UC Irvine";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const NAME = "Rohan Singh";
const EYEBROW = "CS @ UC Irvine · Class of 2027";
const TAGLINE = "Building intelligent systems that see, understand, and scale.";
const FOCUS = "Computer Vision · Generative AI · Full-Stack";
const DOMAIN = "built-by-rohan.vercel.app";
const PLACARD = "UC Irvine ’27";

export default async function OpengraphImage() {
    const [portrait, interBold, inter, interSemi] = await Promise.all([
        // profile.png is JPEG-encoded despite its extension
        readFile(join(process.cwd(), "public/images/profile.png")),
        loadGoogleFont("Inter", 700, NAME),
        loadGoogleFont("Inter", 400, TAGLINE + DOMAIN),
        // Subset must match the rendered glyphs, so uppercase what's drawn uppercase
        loadGoogleFont("Inter", 600, EYEBROW.toUpperCase() + FOCUS + PLACARD.toUpperCase()),
    ]);
    const portraitSrc = `data:image/jpeg;base64,${portrait.toString("base64")}`;

    return new ImageResponse(
        (
            <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: BRAND.navy, fontFamily: "Inter" }}>
                {/* Glows: light UCI blue top-right, UCI blue bottom-left (gold reads olive on navy) */}
                <div style={{ position: "absolute", top: -260, right: -180, width: 760, height: 760, display: "flex", backgroundImage: "radial-gradient(circle, rgba(79,143,224,0.3), rgba(79,143,224,0) 65%)" }} />
                <div style={{ position: "absolute", bottom: -320, left: -220, width: 820, height: 820, display: "flex", backgroundImage: "radial-gradient(circle, rgba(37,87,153,0.6), rgba(37,87,153,0) 65%)" }} />

                {/* Copy */}
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 680, padding: "76px 0 70px 80px" }}>
                    <div style={{ display: "flex", alignItems: "center", fontSize: 20, fontWeight: 600, letterSpacing: 4, textTransform: "uppercase", color: "rgba(251,247,239,0.72)" }}>
                        <div style={{ width: 10, height: 10, borderRadius: 999, background: BRAND.gold, marginRight: 16 }} />
                        {EYEBROW}
                    </div>

                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <div style={{ fontWeight: 700, fontSize: 96, lineHeight: 1.05, color: BRAND.cream, letterSpacing: -3.5 }}>
                            {NAME}
                        </div>
                        <div style={{ marginTop: 28, fontSize: 34, lineHeight: 1.35, color: "rgba(251,247,239,0.8)", maxWidth: 560 }}>
                            {TAGLINE}
                        </div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <div style={{ fontSize: 22, fontWeight: 600, color: BRAND.gold, letterSpacing: 0.5 }}>{FOCUS}</div>
                        <div style={{ marginTop: 10, fontSize: 20, color: "rgba(251,247,239,0.55)" }}>{DOMAIN}</div>
                    </div>
                </div>

                {/* Gallery card — echoes the hero portrait */}
                <div style={{ display: "flex", flex: 1, alignItems: "center", justifyContent: "center", paddingRight: 30 }}>
                    <div style={{ display: "flex", flexDirection: "column", padding: 14, background: BRAND.cream, boxShadow: "0 40px 80px -30px rgba(0,0,0,0.7)" }}>
                        <img src={portraitSrc} width={330} height={330} alt="" style={{ objectFit: "cover" }} />
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 14, paddingTop: 12, borderTop: "1px solid rgba(0,34,68,0.12)" }}>
                            <div style={{ fontWeight: 700, fontSize: 22, color: BRAND.navy, letterSpacing: -0.4 }}>{NAME}</div>
                            <div style={{ display: "flex", alignItems: "center", fontSize: 12, fontWeight: 600, letterSpacing: 2.5, color: BRAND.muted }}>
                                <div style={{ width: 5, height: 5, borderRadius: 999, background: "#F0AB00", marginRight: 8 }} />
                                {PLACARD.toUpperCase()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ),
        {
            ...size,
            fonts: usableFonts([
                { name: "Inter", data: interBold, weight: 700 },
                { name: "Inter", data: inter, weight: 400 },
                { name: "Inter", data: interSemi, weight: 600 },
            ]),
        },
    );
}
