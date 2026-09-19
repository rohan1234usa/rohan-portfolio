"use client";

import { ComponentType } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, AudioWaveform, Download, FolderGit2, Github, Lightbulb, Lock } from "lucide-react";
import { SiGoogleplay } from "react-icons/si";
import { TechIcon } from "./TechIcon";
import { Reveal } from "./motion/Reveal";
import { StaggerGroup, StaggerItem } from "./motion/StaggerGroup";
import { EASE_OUT_QUAD, VIEWPORT } from "./motion/tokens";
import { LINKS } from "@/lib/links";

interface FeaturedProject {
    title: string;
    kind: string;
    summary: string;
    highlights: string[];
    tech: string[];
    live: string;
    source?: string;
    /** Real capture of the live site, 16:9 (1440×810 viewport at 2x, downscaled). */
    shot: string;
    /** Accent wash behind the browser frame — any CSS color. */
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
        live: "https://behavioral-interview-coach.vercel.app/",
        source: "https://github.com/rohan1234usa/behavioral-coach",
        shot: "/images/projects/behavioral-coach.webp",
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
        live: "https://sikhai.vercel.app/",
        source: "https://github.com/rohan1234usa/sikh-ai",
        shot: "/images/projects/sikhai.webp",
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

const BrowserFrame = ({ url, src, alt }: { url: string; src: string; alt: string }) => (
    <div className="relative w-full overflow-hidden rounded-md bg-[#0B0B0F] ring-1 ring-black/10 dark:ring-white/10 shadow-[0_28px_56px_-24px_rgba(0,34,68,0.55)] dark:shadow-[0_28px_64px_-24px_rgba(0,0,0,0.85)] transition-transform duration-500 ease-out group-hover/shot:-translate-y-1.5 motion-reduce:transition-none">
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

const FeaturedRow = ({ project, index }: { project: FeaturedProject; index: number }) => {
    const flip = index % 2 === 1;
    return (
        // grid-cols-1 (minmax(0,1fr)) lets the frame's nowrap URL truncate instead of widening the column
        <StaggerGroup as="article" className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center" stagger={0.12}>
            <StaggerItem className={`lg:col-span-7 ${flip ? "lg:order-last" : ""}`}>
                <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open the ${project.title} live site`}
                    className="group/shot block rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                >
                    <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-line bg-bg-subtle flex items-center px-[7%]">
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
                        <BrowserFrame
                            url={project.live}
                            src={project.shot}
                            alt={`${project.title} landing page`}
                        />
                        <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface/90 backdrop-blur text-[11px] font-medium text-fg shadow-sm opacity-0 translate-y-1 group-hover/shot:opacity-100 group-hover/shot:translate-y-0 group-focus-visible/shot:opacity-100 group-focus-visible/shot:translate-y-0 transition-all duration-300">
                            Visit site
                            <ArrowUpRight aria-hidden size={12} />
                        </span>
                    </div>
                </a>
            </StaggerItem>

            <StaggerItem className="lg:col-span-5">
                <div className="flex items-center gap-2 mb-4 font-mono text-[11px] tracking-[0.18em] uppercase text-fg-muted">
                    <span className="text-accent font-semibold">{String(index + 1).padStart(2, "0")}</span>
                    <span aria-hidden className="w-6 h-px bg-line-strong" />
                    {project.kind}
                </div>
                <h3 className="font-display font-bold text-3xl lg:text-[2.125rem] leading-tight text-balance text-fg mb-4">
                    {project.title}
                </h3>
                <p className="text-fg-soft text-base leading-relaxed font-light mb-6">{project.summary}</p>

                <ul className="space-y-2.5 mb-7">
                    {project.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-3 text-sm text-fg-soft font-light">
                            <span aria-hidden className="w-1.5 h-1.5 mt-2 rounded-full bg-accent-warm flex-shrink-0" />
                            <span>{h}</span>
                        </li>
                    ))}
                </ul>

                <div className="flex flex-wrap gap-2 mb-8">
                    {project.tech.map((t) => (
                        <TechChip key={t} name={t} />
                    ))}
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-fg text-bg text-sm font-medium rounded-sm hover:bg-accent hover:text-on-accent"
                    >
                        Live site
                        <span className="sr-only">: {project.title}</span>
                        <ArrowUpRight aria-hidden size={16} />
                    </a>
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
