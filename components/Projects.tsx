"use client";

import { ComponentType, ReactNode } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, AudioWaveform, Download, FolderGit2, Github, Lightbulb, Lock, Users } from "lucide-react";
import { SiAppstore, SiGoogleplay } from "react-icons/si";
import { BuildingVisual, type BuildingVisualKind } from "./BuildingVisuals";
import { TechIcon } from "./TechIcon";
import { Reveal } from "./motion/Reveal";
import { StaggerGroup, StaggerItem } from "./motion/StaggerGroup";
import { EASE_OUT_QUAD, VIEWPORT } from "./motion/tokens";
import { LINKS } from "@/lib/links";

/** A proof point. The object form renders `lead` in a heavier weight — for a card whose
 *  highlights name the surfaces they describe, like Merge's. */
type Highlight = string | { lead: string; text: string };

/** What fills the 4:3 frame. `site` gets browser chrome and makes the card a link;
 *  `mark` shows an app icon and links nowhere — for a product with no public URL.
 *  A union rather than loose optionals so "url without shot" cannot be written. */
type Frame =
    // `url` is scheme-qualified by type: BrowserFrame calls new URL(url), which throws at
    // prerender — not at tsc — on a bare "example.com".
    | { kind: "site"; url: `https://${string}`; shot: string }
    | { kind: "mark"; src: string };

/** An unreleased product. `label` marks the eyebrow on FEATURED rows (the band lead hides
 *  it); `pill` is the CTA-row text beside the store glyphs, so it states its own platforms
 *  rather than assuming iOS/Android. Delete the whole field on launch day. */
interface Prelaunch {
    label: string;
    pill: string;
}

interface Collaborator {
    name: string;
    url?: string;
}

interface ProjectBase {
    title: string;
    kind: string;
    /** Provenance line under the title, e.g. "Imentiv AI · 2026 internship". */
    context?: string;
    /** Teammates — renders a "With …" credit line. Lives on the base so the credit
     *  survives a move from BUILDING to FEATURED on launch day. Omit it rather than
     *  passing [], which renders identically to having no team at all. */
    collaborators?: Collaborator[];
    summary: string;
    highlights: Highlight[];
    tech: string[];
    source?: string;
    /** Accent wash behind the frame — any CSS color. */
    glow: string;
}

interface FeaturedProject extends ProjectBase {
    prelaunch?: Prelaunch;
    frame: Frame;
}

/** A product with nothing to screenshot yet — no site, no store listing, no app icon.
 *  Renders as a compact row in the "Now building" band, with schematic signal art in the
 *  frame where the real capture will go. Launching one means moving it into FEATURED with
 *  a `frame`, which TypeScript will not let you do while any field below is still set. */
interface BuildingProject extends ProjectBase {
    /** Honest build stage, e.g. "In design". Also fills the frame pill where a URL would
     *  go, so keep it under ~20 characters or it truncates there. */
    stage: string;
    /** The room this product is pointed at, e.g. "the stage". BUILDING_INTRO lists these,
     *  so the intro sentence stays true as the band gains or loses a project. */
    room: string;
    visual: BuildingVisualKind;
}

interface ShippedApp {
    title: string;
    summary: string;
    tech: string[];
    downloads: string;
    context: string;
    link: string;
    Icon: ComponentType<{ size?: number; className?: string; strokeWidth?: number }>;
    iconClass: string;
    tile: string;
}

// Recruiter-facing copy: a hook, then three proof points (what it does → how → a number where
// possible). Every claim traces to the project's code, README, or store listing — interviewers
// will ask about each one.
const FEATURED: FeaturedProject[] = [
    {
        title: "Behavioral Interview Coach",
        kind: "Full-stack · Multimodal AI",
        summary:
            "Soft-skills-first interview simulator that quantifies subconscious cues like facial expression, vocal tone, and pacing to improve delivery.",
        highlights: [
            "Multimodal pipeline fuses face, voice, and transcript signals into four delivery scores: confidence, clarity, resilience, and engagement.",
            "Gemini 2.5 Flash streams résumé-tailored questions for any company and role, then turns your session history into a personalized coaching plan.",
            "Post-session reports pin your strongest and weakest moments to a clickable emotional timeline, with video replay and one-click PDF export.",
        ],
        tech: ["Python", "FastAPI", "Next.js", "Docker", "AWS S3", "Gemini", "Computer Vision"],
        frame: {
            kind: "site",
            url: "https://behavioral-interview-coach.vercel.app/",
            shot: "/images/projects/behavioral-coach.webp",
        },
        source: "https://github.com/rohan1234usa/behavioral-coach",
        glow: "#4F8FE0",
    },
    {
        title: "SikhAI",
        kind: "Full-stack · Generative AI",
        summary:
            "Full-stack spiritual companion: a scripture-grounded AI chatbot, a Punjabi ↔ English translator, Shabad search, the daily Hukamnama, and a community seva board.",
        highlights: [
            "Streaming Gemini chat answers through the lens of any of the ten Gurus, in five response styles and three languages.",
            "Grounded in scripture: the daily Hukamnama and all 1,430 Angs are fetched live from the GurbaniNow API and can be attached as chat context.",
            "Production-grade GenAI: schema-constrained JSON for the translator, graceful Cloud Translation fallback, and nonce-fenced prompts that block injection.",
        ],
        tech: ["Next.js", "TypeScript", "Gemini", "Firebase", "Tailwind"],
        frame: { kind: "site", url: "https://sikhai.vercel.app/", shot: "/images/projects/sikhai.webp" },
        source: "https://github.com/rohan1234usa/sikh-ai",
        glow: "#F59E0B",
    },
];

/** Merge leads the "Now building" band at featured scale: it is the furthest along of the
 *  in-development products and the only one with real art rather than schematic signal art.
 *  Deliberately a FeaturedProject, not a BuildingProject — that keeps the app icon and the
 *  store pill, and makes launch day a move into FEATURED rather than a retype.
 *  Pre-launch: mergecampus.com is withheld until it's polished and the repo is private, so
 *  there is no `source`. On launch day swap `frame` to { kind: "site", url, shot }, delete
 *  `prelaunch`, and move this object into FEATURED — emptying this array drops the lead.
 *  Then finish with steps 3–4 of the checklist above BUILDING: re-tighten the bullets to
 *  what shipped, and mirror the change in README.md.
 *  A 0-or-1 array rather than a nullable const on purpose: TypeScript narrows a `const` to
 *  its initializer, so `: FeaturedProject | null = {…}` makes the no-lead branch `never`
 *  and uncompilable the day you actually use it. Hold at most one entry. */
const BUILDING_LEAD: FeaturedProject[] = [{
    title: "Merge",
    kind: "iOS & Android · Social + AI",
    prelaunch: { label: "Pre-launch", pill: "iOS & Android · coming soon" },
    summary:
        "Where plans with friends come together. Merge is a social platform built around doing things in real life — exploring your college campus, managing plan logistics and feasibility, both timewise and carpool wise, coordinating a bring list between group members and the correlated expenses, along with many other quality of life features meant to support users in making their ambitious outings come to life.",
    // The surfaces a plan actually passes through, each mapping to shipped code: the plan
    // timeline, the expenses hub with its split modes, the grounded suggester and its
    // at-home mode, carpool grouping with route optimization, and ride asks matched by
    // route fit and the detour each rider adds. Copy is Rohan's own — keep any future
    // edit to what the app does, and never claim live traffic data.
    highlights: [
        {
            lead: "The Timeline",
            text: "A shared calendar finds timings that work for everyone involved. Planners can map out their outing stop by stop, while other members can see the plan first and join if it suits them. Makes it possible to view how adjusting the plan impacts the rest.",
        },
        {
            lead: "Expenses",
            text: "Merge turns a scanned receipt into an itemized split, and offers running tabs between friends. There are options to divide a split by item, by serving, equally, by percent, etc.",
        },
        {
            lead: "Move Suggestions",
            text: "Merge answers the classic “What’s the Move?” by suggesting locations in the area catered to the group’s interests, among several other adjustable parameters. It also suggests activities that can be done at home for fun, outlining any materials/items required to do an activity.",
        },
        {
            lead: "Getting there",
            text: "Merge groups carpools, optimizes routes, and solves the carpooling concerns to minimize time spent driving unnecessarily.",
        },
        {
            lead: "Peer-to-peer ridesharing",
            text: "Merge generates the detour distance and converts it into the added fuel cost, matches people based on route similarities, and provides them a platform to negotiate and decide what will work for their carpool purposes.",
        },
    ],
    tech: ["Flutter", "Dart", "Firebase", "Cloud Functions", "Gemini", "Google Maps"],
    frame: { kind: "mark", src: "/images/projects/merge-icon.png" },
    glow: "#2DD4BF",
}];

// ── Launching a "Now building" project ──────────────────────────────────────────────────────
// 1. Capture the live hero at 1920×1080 → public/images/projects/<slug>.webp. Check the file
//    lands: a wrong path is a runtime 404, not a build error.
// 2. Move the entry into FEATURED above, add `frame: { kind: "site", url, shot }` (or
//    `{ kind: "mark", src }` for a store-only app), and delete every field `BuildingProject`
//    adds — read them off the interface, since tsc names only one leftover per compile.
//    Keep `context` and `collaborators` — featured rows render them too.
// 3. Re-tighten the bullets to what shipped, and credit collaborators before it goes public.
// 4. `npx tsc --noEmit` — a FEATURED entry without a `frame`, or one still carrying
//    building-only fields, does not compile. Mirror the change in README.md.
// The intro sentence counts the band and lists each `room`, so it re-words itself.
const BUILDING: BuildingProject[] = [
    {
        title: "SceneSense",
        kind: "0→1 Product · Multimodal AI",
        context: "Imentiv AI · 2026 internship",
        stage: "In design",
        room: "the stage",
        visual: "scene",
        summary:
            "An AI scene partner for actors: it checks a take against what the script actually calls for — face, voice, and words — and knows an improvised line from a forgotten one.",
        highlights: [
            "Greenfield at Imentiv AI, from problem framing to scoring model: on-book mode coaches line by line, off-book returns a full post-take report.",
            "The script becomes the rubric: a sentence-level map of up to 32 emotions, valence, and arousal, with every miss timestamped.",
            "Separates improv from a dropped line: words and emotion still have to match, while a tempo drop or flash of confusion exposes a blank.",
        ],
        tech: ["Python", "Imentiv API", "Speech-to-Text", "Embeddings"],
        glow: "#EC5F8A",
    },
    {
        title: "Pitch Coach",
        kind: "Full-stack · Emotion AI",
        context: "Imentiv AI · 2026 internship",
        stage: "Pre-launch",
        room: "the sales call",
        visual: "pitch",
        summary:
            "Delivery coach for sales reps, designed measurement-first: the pipeline computes the evidence, and the AI is only allowed to explain it.",
        highlights: [
            "Grounded by design: every risk cites a number counted from the transcript, and the coach answers only from the computed timeline.",
            "Six delivery constructs are normalized against the speaker's own resting baseline, so a reserved rep is never graded on a showman's scale.",
            "One FastAPI pipeline serves three products: a scope flag turns the same analysis into Pitch Coach, Reaction, or Full Call.",
        ],
        tech: ["Python", "FastAPI", "Next.js", "PostgreSQL", "AWS S3", "Gemini", "Imentiv API"],
        glow: "#2DD4BF",
    },
    {
        title: "Clarity",
        kind: "Real-time · Multimodal AI",
        // The context line claims a team build, so this row owes its teammates a credit:
        // add `collaborators: [{ name, url }]` before it goes public.
        context: "LA Hacks 2026 · team build · architecture & pipeline design",
        stage: "Hardening for launch",
        room: "the hard conversation",
        visual: "clarity",
        summary:
            "A live AI conversation partner that listens the way people do — face, voice, and words together — because a text-only LLM misses most of what human communication actually carries.",
        highlights: [
            "LangGraph runs the turn loop, Gemma plays the other side of the table, and ElevenLabs streams that voice over WebSocket as it renders.",
            "Catches what a text-only model cannot: each turn is read across face, voice, and language, so feedback covers tone and expression, not just wording.",
            "Designed, built, and demoed in one weekend at LA Hacks 2026, then hardened ever since with correctness fixes and an offline test suite.",
        ],
        tech: ["Python", "FastAPI", "Next.js", "LangGraph", "Gemma", "ElevenLabs", "MongoDB", "Imentiv API"],
        glow: "#A78BFA",
    },
];

const COUNT_WORDS = ["No", "One", "Two", "Three", "Four", "Five", "Six"];

// Built from the rows beneath it so the count and the rooms cannot drift. The lead is
// introduced separately: "delivery is a signal you can measure" is the thesis the other
// three share, and it is not true of Merge, so it is not claimed over it.
const countWord = (n: number) => COUNT_WORDS[n] ?? String(n);
const HAS_LEAD = BUILDING_LEAD.length > 0;
const LEAD_TITLE = BUILDING_LEAD[0]?.title ?? "";
const BUILDING_TOTAL = BUILDING.length + (HAS_LEAD ? 1 : 0);
const ROOMS = BUILDING.map((p) => p.room).join(", ");
const THESIS = "delivery is a signal you can measure";

// Two shapes rather than one string with holes, so each reads as written prose. With a
// lead, it is named first and the thesis is scoped to the rows it actually describes;
// without one, this falls back to the original single sentence.
const BUILDING_INTRO = HAS_LEAD
    ? `${countWord(BUILDING_TOTAL)} product${BUILDING_TOTAL === 1 ? "" : "s"} in the works. ${LEAD_TITLE} is a campus social platform launching at UC Irvine${
          BUILDING.length === 0
              ? "."
              : ` — and ${countWord(BUILDING.length).toLowerCase()} ${
                    BUILDING.length === 1 ? "sits" : "sit"
                } on one thesis, ${THESIS}, each pointed at a different room: ${ROOMS}.`
      }`
    : `${countWord(BUILDING.length)} product${
          BUILDING.length === 1 ? "" : "s"
      } on one thesis — ${THESIS} — each pointed at a different room: ${ROOMS}.`;

const SHIPPED: ShippedApp[] = [
    {
        title: "Hue Christmas",
        summary:
            "Android app that turns Philips Hue smart lights into festive holiday light shows — it finds the Hue Bridge on your network, pairs with it, and animates any room, zone, or single bulb.",
        tech: ["Kotlin", "Jetpack Compose", "Philips Hue API"],
        downloads: "1K+ downloads",
        context: "Asterbyte · 2022",
        link: "https://play.google.com/store/apps/details?id=com.asterbyte.huelightshow&hl=en",
        Icon: Lightbulb,
        iconClass: "text-brand-yellow",
        tile: "linear-gradient(135deg, #0B1B3F 0%, #1B3D6D 100%)",
    },
    {
        title: "Pitch Prime",
        summary:
            "Musician's toolkit — real-time tuner, metronome, and sound-to-sheet-music transcription — rebuilt from the ground up: a rewritten UI layer, leaner performance, and full Spanish → English localization.",
        tech: ["Java", "Android SDK", "Firebase"],
        downloads: "100+ downloads",
        context: "Asterbyte · 2022",
        link: "https://play.google.com/store/apps/details?id=com.sursadhak.pitchprime&hl=en_US",
        Icon: AudioWaveform,
        iconClass: "text-brand-cream",
        tile: "linear-gradient(135deg, #3A1A5C 0%, #5B2C91 100%)",
    },
];

const TechChip = ({ name }: { name: string }) => (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-bg-subtle text-fg-soft text-xs font-medium tracking-wide rounded-sm">
        <TechIcon name={name} />
        {name}
    </span>
);

/** Shared by both frames so the lift and shadow can't drift apart. `group-hover/shot`
 *  only fires when ShotLink renders the linked branch — a card that goes nowhere
 *  deliberately gets no hover feedback. */
const FRAME_CHROME =
    "ring-1 ring-black/10 dark:ring-white/10 shadow-[0_28px_56px_-24px_rgba(0,34,68,0.55)] dark:shadow-[0_28px_64px_-24px_rgba(0,0,0,0.85)] transition-transform duration-500 ease-out group-hover/shot:-translate-y-1.5 motion-reduce:transition-none";

/** Dot grid behind a tile, faded toward the edges. Shared so the pitch and mask can't
 *  drift between the featured and building tiles. */
const DotGrid = () => (
    <div
        aria-hidden
        className="absolute inset-0 [background-image:radial-gradient(var(--line-strong)_1px,transparent_1.5px)] [background-size:18px_18px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]"
    />
);

/** The window bar both framed views share — three dots, a centred pill, a balancing spacer. */
const ChromeBar = ({ pill }: { pill: ReactNode }) => (
    <div className="flex items-center gap-3 h-6 sm:h-7 px-3 bg-[#17171C] border-b border-white/[0.06]">
        <div aria-hidden className="flex gap-1.5 w-10 sm:w-12">
            <span className="w-2 h-2 rounded-full bg-white/20" />
            <span className="w-2 h-2 rounded-full bg-white/20" />
            <span className="w-2 h-2 rounded-full bg-white/20" />
        </div>
        <div className="flex-1 min-w-0 flex justify-center">
            <span className="inline-flex items-center gap-1.5 max-w-full h-4 sm:h-[18px] px-2.5 rounded bg-white/[0.06] font-mono text-[9px] sm:text-[10px] text-white/55">
                {pill}
            </span>
        </div>
        <div aria-hidden className="w-10 sm:w-12" />
    </div>
);

const BrowserFrame = ({ url, src, alt }: { url: string; src: string; alt: string }) => (
    <div className={`relative w-full overflow-hidden rounded-md bg-[#0B0B0F] ${FRAME_CHROME}`}>
        <ChromeBar
            pill={
                <>
                    <Lock aria-hidden size={8} className="flex-shrink-0" />
                    <span className="truncate">{new URL(url).host}</span>
                </>
            }
        />
        <div className="relative aspect-video">
            <Image
                src={src}
                alt={alt}
                fill
                sizes="(min-width: 1024px) 480px, 90vw"
                className="object-cover object-top"
            />
        </div>
    </div>
);

/** The same window, with a build stage where the URL will go once there is one, and
 *  schematic signal art in place of a capture that doesn't exist yet. */
const PreviewFrame = ({ label, glow, visual }: { label: string; glow: string; visual: BuildingVisualKind }) => (
    <div className={`relative w-full overflow-hidden rounded-md bg-[#0B0B0F] ${FRAME_CHROME}`}>
        <ChromeBar
            pill={
                <>
                    <span aria-hidden className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: glow }} />
                    <span className="truncate">{label}</span>
                </>
            }
        />
        <div className="relative aspect-video">
            <div
                aria-hidden
                className="absolute inset-0"
                style={{ backgroundImage: `radial-gradient(70% 90% at 85% 0%, color-mix(in srgb, ${glow} 16%, transparent), transparent 70%)` }}
            />
            <BuildingVisual kind={visual} glow={glow} />
        </div>
    </div>
);

/** Centred app icon, for a product with no site to put in a browser frame. Decorative:
 *  the title is read out beside it, so the image carries no alt text.
 *  `max-w` binds between ~655px and lg, where the single-column layout widens the frame. */
const AppMark = ({ src }: { src: string }) => (
    <div className={`relative w-[46%] max-w-[240px] aspect-square rounded-[22%] overflow-hidden ${FRAME_CHROME}`}>
        <Image
            src={src}
            alt=""
            fill
            sizes="(min-width: 1024px) 216px, (min-width: 768px) 240px, 40vw"
            className="object-cover"
        />
    </div>
);

/** Wraps the frame in a link when there's somewhere to go, a plain div when there isn't.
 *  Keeps the group/shot hook in both cases so the hover lift still runs. */
const ShotLink = ({ project, children }: { project: FeaturedProject; children: ReactNode }) =>
    project.frame.kind === "site" ? (
        <a
            href={project.frame.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open the ${project.title} live site`}
            className="group/shot block rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        >
            {children}
        </a>
    ) : (
        <div>{children}</div>
    );

/** Same dot geometry as the prelaunch eyebrow above, on --status: this one sits in the
 *  "Now building" band, never beside a prelaunch dot, so the two are not co-visible. */
const PingDot = () => (
    <span aria-hidden className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full rounded-full bg-status opacity-75 animate-ping motion-reduce:animate-none" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-status" />
    </span>
);

/** Provenance and team credit. Renders nothing when a project has neither, so it stays
 *  invisible on the existing rows — and keeps the credit when a build ships. */
const ProjectMeta = ({ context, collaborators, className = "" }: { context?: string; collaborators?: Collaborator[]; className?: string }) => {
    const credited = collaborators && collaborators.length > 0 ? collaborators : null;
    if (!context && !credited) return null;
    return (
        // A div, not a p: the global p/li line-height rule is unlayered and would win.
        <div className={className}>
            {context && (
                <div className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-fg-soft">{context}</div>
            )}
            {credited && (
                <div className="mt-1.5 flex items-center gap-1.5 text-xs text-fg-muted">
                    <Users aria-hidden size={12} className="flex-shrink-0" />
                    <span>
                        With{" "}
                        {credited.map((c, i) => (
                            <span key={c.name}>
                                {i > 0 && ", "}
                                {c.url ? (
                                    <a
                                        href={c.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-fg-soft underline decoration-line-strong underline-offset-2 hover:text-accent rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                                    >
                                        {c.name}
                                    </a>
                                ) : (
                                    <span className="text-fg-soft">{c.name}</span>
                                )}
                            </span>
                        ))}
                    </span>
                </div>
            )}
        </div>
    );
};

/** "featured" is a standalone row in the live grid. "band-lead" is the same card leading the
 *  "Now building" band: it borrows BuildingRow's column geometry and breakpoint so the two
 *  line up, and drops a heading level so the rows beneath stay nested under the band label
 *  rather than under this project. `flip` is passed rather than derived, because the lead's
 *  index depends on FEATURED.length and would silently flip if a live project were added. */
const FeaturedRow = ({
    project,
    index,
    variant = "featured",
    flip = false,
}: {
    project: FeaturedProject;
    index: number;
    variant?: "featured" | "band-lead";
    flip?: boolean;
}) => {
    const lead = variant === "band-lead";
    const Heading = lead ? "h4" : "h3";
    const frame = project.frame;
    return (
        // grid-cols-1 (minmax(0,1fr)) lets the frame's nowrap URL truncate instead of widening the column
        <StaggerGroup
            as="article"
            className={
                lead
                    ? "grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 lg:gap-12 items-start"
                    : "grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center"
            }
            stagger={0.12}
        >
            <StaggerItem
                className={
                    lead
                        ? "md:col-span-6 lg:col-span-5"
                        : `lg:col-span-7 ${flip ? "lg:order-last" : ""}`
                }
            >
                <ShotLink project={project}>
                    <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-line bg-bg-subtle flex items-center justify-center px-[7%]">
                        <DotGrid />
                        {/* Per-project accent wash */}
                        <div
                            aria-hidden
                            className="absolute inset-0 opacity-45 dark:opacity-40 group-hover/shot:opacity-80 dark:group-hover/shot:opacity-70 transition-opacity duration-500"
                            style={{
                                backgroundImage: `radial-gradient(65% 60% at ${flip ? "22%" : "78%"} 12%, ${project.glow}, transparent 70%)`,
                            }}
                        />
                        {frame.kind === "mark" ? (
                            <AppMark src={frame.src} />
                        ) : (
                            <BrowserFrame
                                url={frame.url}
                                src={frame.shot}
                                alt={`${project.title} landing page`}
                            />
                        )}
                        {frame.kind === "site" && (
                            <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface/90 backdrop-blur text-[11px] font-medium text-fg shadow-sm opacity-0 translate-y-1 group-hover/shot:opacity-100 group-hover/shot:translate-y-0 group-focus-visible/shot:opacity-100 group-focus-visible/shot:translate-y-0 transition-all duration-300">
                                Visit site
                                <ArrowUpRight aria-hidden size={12} />
                            </span>
                        )}
                    </div>
                </ShotLink>
            </StaggerItem>

            <StaggerItem className={lead ? "md:col-span-6 lg:col-span-7" : "lg:col-span-5"}>
                <div className="flex flex-wrap items-center gap-2 gap-y-1.5 mb-4 font-mono text-[11px] tracking-[0.18em] uppercase text-fg-muted">
                    <span aria-hidden className="text-accent font-semibold">
                        {String(index + 1).padStart(2, "0")}
                    </span>
                    <span aria-hidden className="w-6 h-px bg-line-strong" />
                    {project.kind}
                    {project.prelaunch && !lead && (
                        <span className="inline-flex items-center gap-1.5 tracking-[0.14em] text-fg-soft">
                            {/* Same dot geometry as AvailabilityBadge, but --accent-warm rather than
                                --status: gold there means "open to internships". Both read as UCI gold
                                in light mode, so this is suppressed on the band lead, where the band's
                                own PingDot is already a few rows above it. */}
                            <span aria-hidden className="relative flex h-1.5 w-1.5">
                                <span className="absolute inline-flex h-full w-full rounded-full bg-accent-warm opacity-75 animate-ping motion-reduce:animate-none" />
                                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-warm" />
                            </span>
                            {project.prelaunch.label}
                        </span>
                    )}
                </div>
                <Heading
                    className={`font-display font-bold leading-tight text-balance text-fg mb-4 ${
                        lead ? "text-[1.75rem] lg:text-3xl" : "text-3xl lg:text-[2.125rem]"
                    }`}
                >
                    {project.title}
                </Heading>
                <ProjectMeta context={project.context} collaborators={project.collaborators} className="-mt-2 mb-4" />
                <p className="text-fg-soft text-base leading-relaxed font-light mb-6">{project.summary}</p>

                <ul className="space-y-2.5 mb-7">
                    {project.highlights.map((h) => {
                        const lead = typeof h === "string" ? null : h.lead;
                        const text = typeof h === "string" ? h : h.text;
                        return (
                            <li key={lead ? `${lead}:${text}` : text} className="flex items-start gap-3 text-sm text-fg-soft font-light">
                                <span aria-hidden className="w-1.5 h-1.5 mt-2 rounded-full bg-accent-warm flex-shrink-0" />
                                <span>
                                    {lead && <span className="font-medium text-fg">{lead}: </span>}
                                    {text}
                                </span>
                            </li>
                        );
                    })}
                </ul>

                <div className="flex flex-wrap gap-2 mb-8">
                    {project.tech.map((t) => (
                        <TechChip key={t} name={t} />
                    ))}
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    {frame.kind === "site" && (
                        <a
                            href={frame.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-fg text-bg text-sm font-medium rounded-sm hover:bg-accent hover:text-on-accent"
                        >
                            Live site
                            <span className="sr-only">: {project.title}</span>
                            <ArrowUpRight aria-hidden size={16} />
                        </a>
                    )}
                    {project.source && (
                        <a
                            href={project.source}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 border border-line-strong text-fg-soft text-sm font-medium rounded-sm hover:border-accent hover:text-accent"
                        >
                            <Github aria-hidden size={16} />
                            Source
                            <span className="sr-only"> code: {project.title}</span>
                        </a>
                    )}
                    {project.prelaunch && (
                        // A status, not a control: a plain non-focusable span, so screen readers
                        // don't announce a button for an action that doesn't exist yet.
                        // text-fg-soft, not fg-muted: muted is 3.01:1 on white, under the 4.5:1
                        // AA floor, and this is the only text saying the app hasn't shipped.
                        <span className="inline-flex items-center gap-2 px-5 py-2.5 border border-dashed border-line-strong text-fg-soft text-sm font-medium rounded-sm cursor-default">
                            <SiAppstore aria-hidden size={14} />
                            <SiGoogleplay aria-hidden size={14} />
                            {project.prelaunch.pill}
                        </span>
                    )}
                </div>
            </StaggerItem>
        </StaggerGroup>
    );
};

/** Same grammar as a featured row, scaled down — the frame is already in place, waiting
 *  for the screenshot that replaces the signal art on launch day. */
const BuildingRow = ({ project, index }: { project: BuildingProject; index: number }) => (
    <StaggerGroup as="article" className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 lg:gap-12 items-start" stagger={0.12}>
        <StaggerItem className="max-w-sm md:max-w-none md:col-span-6 lg:col-span-5">
            {/* Decorative throughout: the stage and title are read out in the copy column. */}
            <div aria-hidden className="relative aspect-[4/3] overflow-hidden rounded-sm border border-line bg-bg-subtle flex items-center px-[7%]">
                <DotGrid />
                <div
                    className="absolute inset-0 opacity-45 dark:opacity-40"
                    style={{ backgroundImage: `radial-gradient(65% 60% at 78% 12%, ${project.glow}, transparent 70%)` }}
                />
                <PreviewFrame label={project.stage.toLowerCase()} glow={project.glow} visual={project.visual} />
            </div>
        </StaggerItem>

        <StaggerItem className="md:col-span-6 lg:col-span-7">
            <div className="flex items-center gap-2 mb-3 font-mono text-[11px] tracking-[0.18em] uppercase text-fg-muted">
                <span aria-hidden className="text-accent font-semibold">{String(index + 1).padStart(2, "0")}</span>
                <span aria-hidden className="w-6 h-px bg-line-strong" />
                {project.kind}
            </div>
            <h4 className="font-display font-bold text-2xl leading-tight text-balance text-fg mb-2">{project.title}</h4>
            <ProjectMeta context={project.context} collaborators={project.collaborators} className="mb-4" />
            <p className="text-fg-soft text-[15px] leading-relaxed font-light mb-5">{project.summary}</p>

            <ul className="space-y-2 mb-6">
                {project.highlights.map((h) => {
                    const lead = typeof h === "string" ? null : h.lead;
                    const text = typeof h === "string" ? h : h.text;
                    return (
                        <li key={lead ? `${lead}:${text}` : text} className="flex items-start gap-3 text-sm text-fg-soft font-light">
                            <span aria-hidden className="w-1.5 h-1.5 mt-2 rounded-full bg-accent-warm flex-shrink-0" />
                            <span>
                                {lead && <span className="font-medium text-fg">{lead}: </span>}
                                {text}
                            </span>
                        </li>
                    );
                })}
            </ul>

            <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((t) => (
                    <TechChip key={t} name={t} />
                ))}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 pt-4 border-t border-line">
                <span className="inline-flex items-center gap-2.5 font-mono text-[11px] tracking-[0.14em] uppercase text-fg-soft">
                    <PingDot />
                    {project.stage}
                </span>
                <span className="inline-flex items-center gap-5">
                    {project.source && (
                        <a
                            href={project.source}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm font-medium text-fg-soft hover:text-accent rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                        >
                            <Github aria-hidden size={14} />
                            Source
                            <span className="sr-only"> code: {project.title}</span>
                        </a>
                    )}
                    {/* A real destination, not a disabled button for a site that doesn't exist yet. */}
                    <a
                        href="#contact"
                        className="group inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-fg rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                    >
                        Ask me about it
                        <span className="sr-only">: {project.title}</span>
                        <ArrowRight
                            aria-hidden
                            size={15}
                            className="transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none"
                        />
                    </a>
                </span>
            </div>
        </StaggerItem>
    </StaggerGroup>
);

const AppCard = ({ app }: { app: ShippedApp }) => (
    <StaggerItem className="h-full">
        <a
            href={app.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${app.title} on Google Play`}
            className="group flex flex-col h-full p-6 bg-surface border border-line rounded-sm hover:border-accent/50 outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        >
            <div className="flex items-start justify-between gap-4 mb-5">
                <span
                    aria-hidden
                    className="grid place-items-center w-11 h-11 rounded-[11px] ring-1 ring-black/5 dark:ring-white/10 shadow-sm"
                    style={{ backgroundImage: app.tile }}
                >
                    <app.Icon size={20} strokeWidth={1.75} className={app.iconClass} />
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-fg-muted group-hover:text-accent transition-colors">
                    <SiGoogleplay aria-hidden size={11} />
                    Google Play
                    <ArrowUpRight
                        aria-hidden
                        size={14}
                        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                </span>
            </div>

            <h4 className="font-display font-bold text-xl text-fg group-hover:text-accent transition-colors mb-2">
                {app.title}
            </h4>
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 mb-3 font-mono text-[10.5px] tracking-[0.14em] uppercase text-fg-muted">
                <span className="inline-flex items-center gap-1.5">
                    <Download aria-hidden size={11} />
                    {app.downloads}
                </span>
                <span aria-hidden className="w-1 h-1 rounded-full bg-accent-warm" />
                <span>{app.context}</span>
            </div>
            <p className="flex-grow mb-5 text-sm text-fg-soft font-light">{app.summary}</p>

            <div className="flex flex-wrap gap-2">
                {app.tech.map((t) => (
                    <TechChip key={t} name={t} />
                ))}
            </div>
        </a>
    </StaggerItem>
);

export const Projects = () => (
    <section id="projects" className="py-32 bg-bg relative">
        <div className="container mx-auto px-6 max-w-5xl">
            <Reveal className="mb-20">
                <h2 className="text-4xl lg:text-5xl font-bold text-fg mb-4 font-display flex items-center gap-3">
                    <FolderGit2 className="text-accent" size={32} />
                    Projects
                </h2>
                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={VIEWPORT}
                    transition={{ duration: 0.7, delay: 0.15, ease: EASE_OUT_QUAD }}
                    style={{ transformOrigin: "0% 50%" }}
                    className="w-full h-px bg-line"
                />
            </Reveal>

            <div className="space-y-24 lg:space-y-32">
                {FEATURED.map((p, i) => (
                    <FeaturedRow key={p.title} project={p} index={i} />
                ))}
            </div>

            {(HAS_LEAD || BUILDING.length > 0) && (
                <>
                    <Reveal className="mt-24 lg:mt-32 mb-12 lg:mb-14">
                        <div className="flex items-center gap-4 mb-5">
                            {/* Global h1–h6 rules are unlayered, so style the inner span rather than the heading */}
                            <h3 id="now-building" className="shrink-0 inline-flex items-center gap-2.5">
                                <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-fg-muted font-medium">
                                    Now building
                                </span>
                                <PingDot />
                            </h3>
                            <span aria-hidden className="h-px flex-1 bg-line" />
                        </div>
                        <p className="max-w-2xl text-fg-soft text-base font-light">{BUILDING_INTRO}</p>
                    </Reveal>

                    {/* The lead shares the rows' column geometry so the two line up, and sits a
                        tier above them: a wider gap beneath it than the 56/64px between rows. */}
                    {BUILDING_LEAD.map((p) => (
                        <FeaturedRow key={p.title} project={p} index={FEATURED.length} variant="band-lead" />
                    ))}

                    <div className={`${HAS_LEAD ? "mt-20 lg:mt-24 " : ""}space-y-14 lg:space-y-16`}>
                        {BUILDING.map((p, i) => (
                            <BuildingRow
                                key={p.title}
                                project={p}
                                index={FEATURED.length + (HAS_LEAD ? 1 : 0) + i}
                            />
                        ))}
                    </div>
                </>
            )}

            <Reveal className="mt-24 lg:mt-32 mb-8 flex items-center gap-4">
                {/* Global h1–h6 rules are unlayered, so style the inner span rather than the heading */}
                <h3 className="shrink-0">
                    <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-fg-muted font-medium">
                        Also shipped<span className="hidden sm:inline"> · Google Play</span>
                    </span>
                </h3>
                <span aria-hidden className="h-px flex-1 bg-line" />
                <a
                    href={LINKS.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 inline-flex items-center gap-1.5 whitespace-nowrap text-xs font-medium text-fg-soft hover:text-accent"
                >
                    <Github aria-hidden size={14} />
                    <span>
                        <span className="hidden sm:inline">More on </span>GitHub
                    </span>
                    <ArrowUpRight aria-hidden size={13} />
                </a>
            </Reveal>

            <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 gap-6" stagger={0.1}>
                {SHIPPED.map((app) => (
                    <AppCard key={app.title} app={app} />
                ))}
            </StaggerGroup>
        </div>
    </section>
);
