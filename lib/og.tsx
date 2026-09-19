// Shared pieces for the generated icon / Open Graph images (rendered by next/og at build time).

export const BRAND = {
    navy: "#002244",
    blue: "#255799",
    cream: "#FBF7EF",
    gold: "#FECC07",
    muted: "#8896A8",
} as const;

/**
 * next/og can't use next/font, so fetch the TTF straight from Google Fonts, subset to `text`.
 * Returns null on any failure — including a stalled request, capped by the timeout — so image
 * generation falls back to the built-in font instead of failing or hanging the build.
 */
const FETCH_TIMEOUT_MS = 8000;

export async function loadGoogleFont(family: string, weight: number, text: string): Promise<ArrayBuffer | null> {
    try {
        const url = `https://fonts.googleapis.com/css2?family=${family.replace(/ /g, "+")}:wght@${weight}&text=${encodeURIComponent(text)}`;
        const css = await (await fetch(url, { signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) })).text();
        const src = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
        if (!src) return null;
        const res = await fetch(src, { signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) });
        return res.ok ? await res.arrayBuffer() : null;
    } catch {
        return null;
    }
}

type FontSpec = { name: string; data: ArrayBuffer | null; weight: 400 | 600 | 700 };

/** Drop fonts that failed to load; `undefined` tells next/og to use its default font. */
export function usableFonts(fonts: FontSpec[]) {
    const loaded = fonts.flatMap(({ name, data, weight }) => (data ? [{ name, data, weight, style: "normal" as const }] : []));
    return loaded.length ? loaded : undefined;
}

/** "RS" monogram — navy tile, cream R, gold S (mirrors the navbar wordmark). Inter stands in for the site's system font. */
export const Monogram = ({ size, radius }: { size: number; radius: number }) => (
    <div
        style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: BRAND.navy,
            borderRadius: radius,
            fontFamily: "Inter",
            fontWeight: 700,
            fontSize: size * 0.56,
            letterSpacing: -size * 0.04,
            lineHeight: 1,
            paddingBottom: size * 0.04,
        }}
    >
        <span style={{ color: BRAND.cream }}>R</span>
        <span style={{ color: BRAND.gold }}>S</span>
    </div>
);
