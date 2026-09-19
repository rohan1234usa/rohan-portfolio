import { ImageResponse } from "next/og";
import { Monogram, loadGoogleFont, usableFonts } from "@/lib/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// iOS applies its own rounded mask, so the tile stays square here.
export default async function AppleIcon() {
    const inter = await loadGoogleFont("Inter", 700, "RS");
    return new ImageResponse(<Monogram size={size.width} radius={0} />, {
        ...size,
        fonts: usableFonts([{ name: "Inter", data: inter, weight: 700 }]),
    });
}
