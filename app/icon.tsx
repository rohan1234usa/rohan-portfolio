import { ImageResponse } from "next/og";
import { Monogram, loadGoogleFont, usableFonts } from "@/lib/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon() {
    const inter = await loadGoogleFont("Inter", 700, "RS");
    return new ImageResponse(<Monogram size={size.width} radius={7} />, {
        ...size,
        fonts: usableFonts([{ name: "Inter", data: inter, weight: 700 }]),
    });
}
