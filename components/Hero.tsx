"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Linkedin, Briefcase } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { WordReveal } from "./motion/WordReveal";
import { StaggerGroup, StaggerItem } from "./motion/StaggerGroup";
import { Magnetic } from "./motion/Magnetic";
import { TypingCode } from "./motion/TypingCode";
import { Reveal } from "./motion/Reveal";
import { DURATION, EASE_OUT_QUAD } from "./motion/tokens";

const LINKS = {
    email: "mailto:rohans9@uci.edu",
    linkedin: "https://linkedin.com/in/rohan123",
};

export const Hero = () => {
    const reduce = useReducedMotion();
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"],
    });
    const photoY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -40]);

    return (
        <section ref={sectionRef} className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden">
            <div className="container mx-auto px-6 grid lg:grid-cols-[1.2fr_0.8fr] gap-16 items-center">
                <StaggerGroup immediate delayChildren={0.1} stagger={0.13}>
                    <StaggerItem className="flex flex-wrap gap-3 mb-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium tracking-wide text-fg-soft border-b border-line-strong">
                            CS @ UC Irvine
                            <span className="w-1.5 h-1.5 rounded-full bg-accent-warm"></span>
                            GPA 3.92
                        </div>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium tracking-wide text-fg-soft border-b border-status/60">
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="absolute inline-flex h-full w-full rounded-full bg-status opacity-75 animate-ping"></span>
                                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-status"></span>
                            </span>
                            <Briefcase size={12} className="text-fg" />
                            Open to SWE/ML internships — Summer 2026
                        </div>
                    </StaggerItem>

                    <StaggerItem>
                        <h1 className="text-5xl lg:text-7xl font-bold text-fg leading-[1.1] mb-8 font-display tracking-tight">
                            <WordReveal
                                lines={["Building the Future of"]}
                                lineClassName="block"
                                delay={0.05}
                            />
                            <Reveal
                                as="span"
                                delay={0.55}
                                y={32}
                                className="block pb-[0.2em] text-transparent bg-clip-text bg-gradient-hero"
                            >
                                Intelligent Systems
                            </Reveal>
                        </h1>
                    </StaggerItem>

                    <StaggerItem>
                        <p className="text-xl text-fg-soft mb-10 max-w-lg leading-relaxed font-light">
                            Engineering intelligent systems that <span className="font-medium text-fg">see, understand, and scale</span>.
                            Specializing in Computer Vision, Generative AI, and High-Performance Pipelines.
                        </p>
                    </StaggerItem>

                    <StaggerItem className="flex flex-wrap gap-4">
                        <Magnetic>
                            <a
                                href="#projects"
                                className="px-8 py-4 bg-fg text-bg font-medium rounded-sm hover:bg-accent hover:text-on-accent transition-colors duration-300"
                            >
                                View Work
                            </a>
                        </Magnetic>
                        <Magnetic>
                            <a
                                href={LINKS.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-8 py-4 bg-accent text-on-accent font-medium rounded-sm hover:bg-fg hover:text-bg transition-colors duration-300 inline-flex items-center gap-2"
                            >
                                <Linkedin size={18} />
                                Connect on LinkedIn
                            </a>
                        </Magnetic>
                        <a
                            href="/resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-4 border border-line-strong text-fg-soft font-medium rounded-sm hover:border-accent hover:text-accent transition-all duration-300"
                        >
                            Resume
                        </a>
                    </StaggerItem>

                    <StaggerItem className="mt-10 max-w-sm font-mono text-xs leading-relaxed text-fg-soft bg-surface/80 border border-line backdrop-blur-sm rounded-sm shadow-md">
                        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-line">
                            <span className="w-2.5 h-2.5 rounded-full bg-accent/60"></span>
                            <span className="w-2.5 h-2.5 rounded-full bg-accent-warm/70"></span>
                            <span className="w-2.5 h-2.5 rounded-full bg-accent-cool/60"></span>
                            <span className="ml-2 text-[10px] uppercase tracking-wider text-fg-muted">
                                now.ts
                            </span>
                        </div>
                        <TypingCode
                            className="px-4 py-3 whitespace-pre min-h-[7.5rem]"
                            speed={22}
                            startDelay={1100}
                            caret={<span className="ml-0.5 text-accent">▍</span>}
                            segments={[
                                { text: "const", className: "text-accent" },
                                { text: " focus", className: "text-fg" },
                                { text: " = [\n  " },
                                { text: "\"Multimodal RAG\"", className: "text-fg-soft" },
                                { text: ",\n  " },
                                { text: "\"CV pipelines @ scale\"", className: "text-fg-soft" },
                                { text: ",\n  " },
                                { text: "\"Real-time inference\"", className: "text-fg-soft" },
                                { text: ",\n];" },
                            ]}
                        />
                    </StaggerItem>
                </StaggerGroup>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: DURATION.long, delay: 0.45, ease: EASE_OUT_QUAD }}
                    style={{ y: photoY }}
                    className="relative flex justify-center lg:justify-end"
                >
                    <div className="group relative w-80 h-[420px] lg:w-[440px] lg:h-[560px]">
                        {/* Matte / outer card */}
                        <div className="absolute inset-0 flex flex-col p-3 bg-surface border border-line-strong shadow-[0_30px_60px_-30px_rgba(0,34,68,0.3)] dark:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.7)] transition-all duration-500 ease-out group-hover:-translate-y-0.5 group-hover:shadow-[0_40px_70px_-30px_rgba(0,34,68,0.35)] dark:group-hover:shadow-[0_40px_70px_-30px_rgba(0,0,0,0.8)]">
                            {/* Photo cell — square */}
                            <div className="relative w-full aspect-square overflow-hidden flex-shrink-0">
                                <Image
                                    src="/images/profile.png"
                                    alt="Rohan Singh"
                                    fill
                                    sizes="(min-width: 1024px) 416px, 304px"
                                    className="object-cover [filter:contrast(0.96)_saturate(0.94)] dark:[filter:contrast(0.95)_saturate(0.92)_brightness(0.98)] transition-transform duration-500 ease-out group-hover:scale-[1.015]"
                                    priority
                                />
                                {/* Vignette */}
                                <div
                                    aria-hidden
                                    className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,34,68,0.22)_100%)] dark:bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.4)_100%)]"
                                />
                                {/* Film grain */}
                                <div
                                    aria-hidden
                                    className="absolute inset-0 pointer-events-none opacity-[0.08] mix-blend-multiply dark:mix-blend-screen"
                                    style={{
                                        backgroundImage:
                                            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.5 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
                                    }}
                                />
                                {/* Inset hairline (print-border) */}
                                <div aria-hidden className="absolute inset-0 border border-white/15 pointer-events-none" />
                            </div>

                            {/* Placard strip */}
                            <div className="flex-1 mt-3 pt-3 px-1 border-t border-line flex flex-col justify-center gap-1.5">
                                <div className="flex items-baseline justify-between gap-3">
                                    <span className="font-display text-lg lg:text-xl text-fg tracking-tight leading-none">
                                        Rohan Singh
                                    </span>
                                    <span className="flex items-center gap-1.5 font-mono text-[10px] tracking-[0.18em] uppercase text-fg-muted whitespace-nowrap">
                                        <span className="w-1 h-1 rounded-full bg-accent-warm" />
                                        UC Irvine &rsquo;28
                                    </span>
                                </div>
                                <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-fg-muted leading-none">
                                    Software &middot; Machine Learning
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Abstract "Bridge" Element */}
                    <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-accent-warm/20 -z-10 blur-xl"></div>
                </motion.div>
            </div>
        </section>
    );
};
