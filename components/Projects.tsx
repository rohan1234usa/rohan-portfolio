"use client";

import { ComponentType, ReactNode } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, AudioWaveform, Download, FolderGit2, Github, Lightbulb, Lock } from "lucide-react";
import { SiAppstore, SiGoogleplay } from "react-icons/si";
import { TechIcon } from "./TechIcon";
import { Reveal } from "./motion/Reveal";
import { StaggerGroup, StaggerItem } from "./motion/StaggerGroup";
import { EASE_OUT_QUAD, VIEWPORT } from "./motion/tokens";
import { LINKS } from "@/lib/links";

/** A proof point. The object form renders `lead` in a heavier weight — for a card whose
 *  highlights walk a sequence (Merge's Decide → Plan → Get there → Settle up). */
type Highlight = string | { lead: string; text: string };

/** What fills the 4:3 frame. `site` gets browser chrome and makes the card a link;
 *  `mark` shows an app icon and links nowhere — for a product with no public URL.
 *  A union rather than loose optionals so "url without shot" cannot be written. */
type Frame =
    | { kind: "site"; url: string; shot: string }
    | { kind: "mark"; src: string };

/** An unreleased product. `label` marks the eyebrow; `pill` is the CTA-row text beside
 *  the store glyphs, so it states its own platforms rather than assuming iOS/Android.
 *  Delete the whole field on launch day. */
interface Prelaunch {
    label: string;
    pill: string;
}

interface FeaturedProject {
    title: string;
    kind: string;
    prelaunch?: Prelaunch;
    summary: string;
    highlights: Highlight[];
    tech: string[];
    frame: Frame;
    source?: string;
    /** Accent wash behind the frame — any CSS color. */
    glow: string;
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
        // Pre-launch: mergecampus.com is withheld until it's polished, and the repo is
        // private, so there is no `source`. On launch day swap `frame` to
        // { kind: "site", url, shot } (or add a store link) and delete `prelaunch`.
        title: "Merge",
        kind: "iOS & Android · Social + AI",
        prelaunch: { label: "Pre-launch", pill: "iOS & Android · coming soon" },
        summary:
            "Where plans with friends come together. Merge is a social platform built around real life — find something fun to do, see who’s in, get there together, and split the cost. Launching at UC Irvine.",
        // The loop a hangout actually follows. Each claim maps to shipped code: the grounded
        // suggester, Find a time + RSVP, the timeline solver re-anchored on stamped arrivals
        // (an offline drive-time model — deliberately not "live traffic"), and the expenses hub.
        highlights: [
            {
                lead: "Decide",
                text: "“What’s the Move?” finds something fun nearby — real places that fit the group’s budget and are open when everyone arrives. The AI plans the search, but the server owns every fact, so nothing on the card can be invented.",
            },
            {
                lead: "Plan",
                text: "A shared calendar finds a time that works for everyone. Planners map out the night stop by stop, while go-alongs see the plan first and join when it suits them.",
            },
            {
                lead: "Get there",
                text: "Merge pairs carpools, optimizes routes, and solves a timeline that tells each person when to leave and when they’ll be home. As real arrivals come in, it re-solves the rest of the night.",
            },
            {
                lead: "Settle up",
                text: "A scanned receipt becomes an itemized split, a running tab between friends carries over from one plan to the next, and everyone gets a private view of their own spending.",
            },
        ],
        tech: ["Flutter", "Dart", "Firebase", "Cloud Functions", "Gemini", "Google Maps"],
        frame: { kind: "mark", src: "/images/projects/merge-icon.png" },
        glow: "#2DD4BF",
    },
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

const BrowserFrame = ({ url, src, alt }: { url: string; src: string; alt: string }) => (
    <div className={`relative w-full overflow-hidden rounded-md bg-[#0B0B0F] ${FRAME_CHROME}`}>
        {/* Window chrome */}
        <div className="flex items-center gap-3 h-6 sm:h-7 px-3 bg-[#17171C] border-b border-white/[0.06]">
            <div aria-hidden className="flex gap-1.5 w-10 sm:w-12">
                <span className="w-2 h-2 rounded-full bg-white/20" />
                <span className="w-2 h-2 rounded-full bg-white/20" />
                <span className="w-2 h-2 rounded-full bg-white/20" />
            </div>
            <div className="flex-1 min-w-0 flex justify-center">
                <span className="inline-flex items-center gap-1.5 max-w-full h-4 sm:h-[18px] px-2.5 rounded bg-white/[0.06] font-mono text-[9px] sm:text-[10px] text-white/55">
                    <Lock aria-hidden size={8} className="flex-shrink-0" />
                    <span className="truncate">{new URL(url).host}</span>
                </span>
            </div>
            <div aria-hidden className="w-10 sm:w-12" />
        </div>
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

const FeaturedRow = ({ project, index }: { project: FeaturedProject; index: number }) => {
    const flip = index % 2 === 1;
    const frame = project.frame;
    return (
        // grid-cols-1 (minmax(0,1fr)) lets the frame's nowrap URL truncate instead of widening the column
        <StaggerGroup as="article" className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center" stagger={0.12}>
            <StaggerItem className={`lg:col-span-7 ${flip ? "lg:order-last" : ""}`}>
                <ShotLink project={project}>
                    <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-line bg-bg-subtle flex items-center justify-center px-[7%]">
                        {/* Dot grid, faded toward the edges */}
                        <div
                            aria-hidden
                            className="absolute inset-0 [background-image:radial-gradient(var(--line-strong)_1px,transparent_1.5px)] [background-size:18px_18px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]"
                        />
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

            <StaggerItem className="lg:col-span-5">
                <div className="flex flex-wrap items-center gap-2 gap-y-1.5 mb-4 font-mono text-[11px] tracking-[0.18em] uppercase text-fg-muted">
                    <span aria-hidden className="text-accent font-semibold">
                        {String(index + 1).padStart(2, "0")}
                    </span>
                    <span aria-hidden className="w-6 h-px bg-line-strong" />
                    {project.kind}
                    {project.prelaunch && (
                        <span className="inline-flex items-center gap-1.5 tracking-[0.14em] text-fg-soft">
                            {/* Same dot geometry as AvailabilityBadge, but --accent-warm rather than
                                --status: gold there means "open to internships". The two read alike in
                                light mode (both UCI golds) and differ in dark; they are never co-visible. */}
                            <span aria-hidden className="relative flex h-1.5 w-1.5">
                                <span className="absolute inline-flex h-full w-full rounded-full bg-accent-warm opacity-75 animate-ping motion-reduce:animate-none" />
                                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-warm" />
                            </span>
                            {project.prelaunch.label}
                        </span>
                    )}
                </div>
                <h3 className="font-display font-bold text-3xl lg:text-[2.125rem] leading-tight text-balance text-fg mb-4">
                    {project.title}
                </h3>
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
