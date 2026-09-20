"use client";

import { motion, type Variants } from "framer-motion";
import { useReducedMotionSafe } from "./motion/useReducedMotionSafe";
import { DURATION, EASE_OUT_QUAD, VIEWPORT } from "./motion/tokens";

/**
 * Signal art for the "Now building" rows — a schematic of what each product measures,
 * drawn on the always-dark frame body in place of a screenshot that doesn't exist yet.
 *
 * Deliberately illustrative, never a fake dashboard: no numbers, no percentages, no
 * invented metrics. Each motif shows the *idea* a recruiter should take away, and is
 * replaced by a real capture the day the project launches.
 */
export type BuildingVisualKind = "scene" | "pitch" | "clarity";

// Fixed inks — the frame body is #0B0B0F in both themes, so white alphas are safe.
const HI = "rgba(255,255,255,0.85)";
const MID = "rgba(255,255,255,0.55)";
const LO = "rgba(255,255,255,0.22)";
const GRID = "rgba(255,255,255,0.08)";
const BODY = "#0B0B0F";

const LABEL = { fontSize: 9, letterSpacing: "0.06em" } as const;
const TAG = { fontSize: 8, letterSpacing: "0.06em" } as const;

/**
 * Draw-on for a solid stroke. `pathLength` is framer's normalized dash trick, so it
 * cannot be combined with a real strokeDasharray — dashed marks use `fade` instead.
 * Reduced motion keeps the same elements and targets and simply lands them instantly.
 */
const draw = (reduce: boolean, duration = 1.2): Variants => ({
    hidden: { pathLength: 0, opacity: 0 },
    show: (delay: number = 0) => ({
        pathLength: 1,
        opacity: 1,
        transition: reduce
            ? { duration: 0 }
            : {
                pathLength: { duration, delay, ease: EASE_OUT_QUAD },
                // Snap opacity on so a round cap doesn't sit as a dot at length 0.
                opacity: { duration: 0.01, delay },
            },
    }),
});

const fade = (reduce: boolean): Variants => ({
    hidden: { opacity: 0 },
    show: (delay: number = 0) => ({
        opacity: 1,
        transition: reduce ? { duration: 0 } : { duration: DURATION.short, delay, ease: EASE_OUT_QUAD },
    }),
});

const Svg = ({ children }: { children: React.ReactNode }) => (
    <motion.svg
        viewBox="0 0 320 180"
        fill="none"
        aria-hidden
        focusable="false"
        initial="hidden"
        whileInView="show"
        viewport={{ ...VIEWPORT, amount: 0.35 }}
        className="absolute inset-0 h-full w-full font-mono select-none pointer-events-none"
    >
        {children}
    </motion.svg>
);

/* ── SceneSense ─────────────────────────────────────────────────────────────
   The script's emotional arc vs. the take: they track, then split at a dropped
   line, then the actor's own choice overshoots — and that one is fine.        */
const SceneVisual = ({ glow, reduce }: { glow: string; reduce: boolean }) => {
    const drawArc = draw(reduce, 1.4);
    const f = fade(reduce);
    return (
        <Svg>
            {/* Legend */}
            <path d="M16 20H34" stroke={MID} strokeWidth={1.5} strokeDasharray="3 3" />
            <text x={40} y={23} fill={MID} {...TAG}>SCRIPT</text>
            <path d="M88 20H106" stroke={glow} strokeWidth={2.25} strokeLinecap="round" />
            <text x={112} y={23} fill={glow} {...TAG}>PERFORMANCE</text>

            {/* Script-line ticks */}
            <path d="M16 150H304" stroke={GRID} strokeWidth={1} />
            {Array.from({ length: 13 }, (_, i) => (
                <path key={i} d={`M${16 + 24 * i} 153V159`} stroke={LO} strokeWidth={1} />
            ))}

            {/* Target arc — dashed, so it fades rather than draws */}
            <motion.path
                d="M16 104C48 104 64 64 104 64C144 64 152 100 184 100C216 100 232 48 272 48C288 48 296 54 304 58"
                stroke={MID}
                strokeWidth={1.5}
                strokeDasharray="4 4"
                strokeLinecap="round"
                variants={f}
                custom={0.1}
            />
            {/* The take */}
            <motion.path
                d="M16 108C48 106 66 68 104 66C124 65 134 118 156 122C176 125 188 104 208 92C228 80 240 34 258 34C276 34 290 50 304 56"
                stroke={glow}
                strokeWidth={2.25}
                strokeLinecap="round"
                variants={drawArc}
                custom={0.35}
            />

            {/* Miss — hollow mark */}
            <motion.g variants={f} custom={0.75}>
                <path d="M156 93V118" stroke={MID} strokeWidth={1} strokeDasharray="2 3" />
                <circle cx={156} cy={122} r={3.5} fill={BODY} stroke={HI} strokeWidth={1.5} />
                <rect x={118} y={131} width={76} height={13} rx={2} fill="rgba(255,255,255,0.06)" stroke={LO} strokeWidth={1} />
                <text x={156} y={140} fill={HI} textAnchor="middle" fontSize={7.5} letterSpacing="0.06em">DROPPED LINE</text>
            </motion.g>

            {/* Creative choice — filled mark */}
            <motion.g variants={f} custom={1.05}>
                <circle cx={258} cy={34} r={3.5} fill={glow} />
                <rect x={224} y={11} width={62} height={13} rx={2} fill={glow} fillOpacity={0.14} stroke={glow} strokeOpacity={0.5} strokeWidth={1} />
                <text x={231} y={20} fill={glow} fontSize={7.5} letterSpacing="0.06em">IMPROV</text>
                <path d="M269 17.5l2.5 2.5 4.5-5.5" stroke={glow} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
            </motion.g>
        </Svg>
    );
};

/* ── Pitch Coach ────────────────────────────────────────────────────────────
   Six constructs, each read against that speaker's own resting baseline —
   the tick is the point of the whole picture, so it lands before the bar.     */
const CONSTRUCTS: { label: string; value: number; baseline: number }[] = [
    { label: "CONFIDENCE", value: 0.74, baseline: 0.56 },
    { label: "PRESENCE", value: 0.52, baseline: 0.64 },
    { label: "CLARITY", value: 0.82, baseline: 0.6 },
    { label: "COMPOSURE", value: 0.47, baseline: 0.55 },
    { label: "EXPRESSIVENESS", value: 0.69, baseline: 0.5 },
    { label: "AUTHENTICITY", value: 0.78, baseline: 0.7 },
];

const TRACK_X = 116;
const TRACK_W = 188;

const PitchVisual = ({ glow, reduce }: { glow: string; reduce: boolean }) => {
    const drawBar = draw(reduce, 0.9);
    const drawDelta = draw(reduce, 0.5);
    const f = fade(reduce);
    return (
        <Svg>
            {/* Legend */}
            <path d="M232 14V26" stroke={HI} strokeWidth={1.5} />
            <text x={304} y={23} fill={MID} textAnchor="end" fontSize={7.5} letterSpacing="0.06em">YOUR BASELINE</text>

            {CONSTRUCTS.map((c, i) => {
                const y = 42 + 22 * i;
                const vx = Math.round(TRACK_X + c.value * TRACK_W);
                const bx = Math.round(TRACK_X + c.baseline * TRACK_W);
                const above = vx >= bx;
                return (
                    <g key={c.label}>
                        <text x={108} y={y + 3} fill={MID} textAnchor="end" {...LABEL}>{c.label}</text>
                        <path d={`M${TRACK_X} ${y}H${TRACK_X + TRACK_W}`} stroke={GRID} strokeWidth={6} strokeLinecap="round" />
                        <motion.path
                            d={`M${TRACK_X} ${y}H${vx}`}
                            stroke={glow}
                            strokeOpacity={0.45}
                            strokeWidth={6}
                            strokeLinecap="round"
                            variants={drawBar}
                            custom={0.35 + 0.07 * i}
                        />
                        {/* Distance from this speaker's own normal — the reading that matters */}
                        <motion.path
                            d={`M${Math.min(vx, bx)} ${y}H${Math.max(vx, bx)}`}
                            stroke={above ? glow : HI}
                            strokeOpacity={above ? 1 : 0.4}
                            strokeWidth={above ? 6 : 2}
                            strokeLinecap="round"
                            variants={drawDelta}
                            custom={0.95 + 0.07 * i}
                        />
                        <motion.path
                            d={`M${bx} ${y - 7}V${y + 7}`}
                            stroke={HI}
                            strokeWidth={1.5}
                            variants={f}
                            custom={0.1 + 0.04 * i}
                        />
                    </g>
                );
            })}
        </Svg>
    );
};

/* ── Clarity ────────────────────────────────────────────────────────────────
   Three channels fused into one read — and a bracket around the only one a
   text-only model ever gets to see.                                           */
const VOICE_BARS = [3, 6, 9, 5, 11, 7, 4, 8, 12, 6, 9, 4, 7, 5, 3];

const ClarityVisual = ({ glow, reduce }: { glow: string; reduce: boolean }) => {
    const drawLane = draw(reduce, 0.9);
    const drawLink = draw(reduce, 0.5);
    const f = fade(reduce);
    const voice = VOICE_BARS.map((h, i) => `M${58 + 8 * i} ${82 - h}V${82 + h}`).join("");
    return (
        <Svg>
            <text x={14} y={47} fill={MID} {...LABEL}>FACE</text>
            <text x={14} y={85} fill={MID} {...LABEL}>VOICE</text>
            <text x={14} y={123} fill={MID} {...LABEL}>WORDS</text>

            <motion.path
                d="M56 44C66 32 78 32 88 44S110 56 120 44S142 34 152 44S168 50 176 44"
                stroke="rgba(255,255,255,0.7)"
                strokeWidth={1.75}
                strokeLinecap="round"
                variants={drawLane}
                custom={0.1}
            />
            <motion.path d={voice} stroke="rgba(255,255,255,0.7)" strokeWidth={2.5} strokeLinecap="round" variants={drawLane} custom={0.15} />
            <motion.path
                d="M56 120H72M76 120H100M104 120H116M120 120H146M150 120H162M166 120H176"
                stroke="rgba(255,255,255,0.7)"
                strokeWidth={3}
                strokeLinecap="round"
                variants={drawLane}
                custom={0.2}
            />

            {/* Connectors → fusion → one grounded read */}
            <motion.path d="M180 44C206 44 212 82 238 82" stroke="rgba(255,255,255,0.3)" strokeWidth={1.5} variants={drawLink} custom={0.75} />
            <motion.path d="M180 82H238" stroke="rgba(255,255,255,0.3)" strokeWidth={1.5} variants={drawLink} custom={0.75} />
            <motion.path d="M192 120C214 120 216 82 238 82" stroke="rgba(255,255,255,0.3)" strokeWidth={1.5} variants={drawLink} custom={0.75} />
            <motion.g variants={f} custom={1.05}>
                <circle cx={238} cy={82} r={10} fill={glow} fillOpacity={0.18} />
                <circle cx={238} cy={82} r={4.5} fill={glow} />
            </motion.g>
            <motion.path d="M246 82H300" stroke={glow} strokeWidth={2.5} strokeLinecap="round" variants={drawLink} custom={1.15} />
            <motion.path d="M295 76.5L301 82L295 87.5" stroke={glow} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" variants={drawLink} custom={1.15} />
            <motion.text x={301} y={66} fill={glow} textAnchor="end" variants={f} custom={1.35} {...TAG}>FEEDBACK</motion.text>

            {/* The punchline: everything outside this box is what a transcript throws away. */}
            <motion.g variants={f} custom={1.55}>
                <rect x={6} y={106} width={182} height={28} rx={3} stroke={LO} strokeWidth={1} strokeDasharray="4 4" />
                <text x={97} y={148} fill={MID} textAnchor="middle" fontSize={7.5} letterSpacing="0.06em">WHAT A TEXT-ONLY LLM SEES</text>
            </motion.g>
        </Svg>
    );
};

export const BuildingVisual = ({ kind, glow }: { kind: BuildingVisualKind; glow: string }) => {
    const reduce = useReducedMotionSafe();
    switch (kind) {
        case "scene":
            return <SceneVisual glow={glow} reduce={reduce} />;
        case "pitch":
            return <PitchVisual glow={glow} reduce={reduce} />;
        case "clarity":
            return <ClarityVisual glow={glow} reduce={reduce} />;
        default: {
            // A new kind without a case fails the build rather than rendering nothing.
            const exhaustive: never = kind;
            return exhaustive;
        }
    }
};
