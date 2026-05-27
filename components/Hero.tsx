"use client";

import { motion } from "framer-motion";
import { Linkedin, Briefcase } from "lucide-react";
import Image from "next/image";

const LINKS = {
    email: "mailto:rohans9@uci.edu",
    linkedin: "https://linkedin.com/in/rohan123",
};

export const Hero = () => (
    <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="container mx-auto px-6 grid lg:grid-cols-[1.2fr_0.8fr] gap-16 items-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <div className="flex flex-wrap gap-3 mb-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium tracking-wide text-brand-charcoal/70 dark:text-brand-cream/70 border-b border-brand-charcoal/20 dark:border-brand-cream/20">
                        CS @ UC Irvine
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-gold"></span>
                        GPA 3.92
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium tracking-wide text-brand-charcoal/70 dark:text-brand-cream/70 border-b border-emerald-500/40">
                        <span className="relative flex h-1.5 w-1.5">
                            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75 animate-ping"></span>
                            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                        </span>
                        <Briefcase size={12} className="text-emerald-600 dark:text-emerald-400" />
                        Open to SWE/ML internships — Summer 2026
                    </div>
                </div>

                <h1 className="text-5xl lg:text-7xl font-bold text-brand-navy dark:text-brand-cream leading-[1.1] mb-8 font-display tracking-tight">
                    Building the Future of <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-navy dark:from-brand-gold dark:via-brand-yellow dark:to-brand-cream">
                        Intelligent Systems
                    </span>
                </h1>

                <p className="text-xl text-brand-charcoal/80 dark:text-brand-cream/75 mb-10 max-w-lg leading-relaxed font-light">
                    Engineering intelligent systems that <span className="font-medium text-brand-navy dark:text-brand-cream">see, understand, and scale</span>.
                    Specializing in Computer Vision, Generative AI, and High-Performance Pipelines.
                </p>

                <div className="flex flex-wrap gap-4">
                    <a
                        href="#projects"
                        className="px-8 py-4 bg-brand-navy dark:bg-brand-cream dark:text-brand-navy text-white font-medium rounded-sm hover:bg-brand-purple dark:hover:bg-brand-gold transition-colors duration-300"
                    >
                        View Work
                    </a>
                    <a
                        href={LINKS.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-4 bg-brand-purple text-white font-medium rounded-sm hover:bg-brand-navy transition-colors duration-300 inline-flex items-center gap-2"
                    >
                        <Linkedin size={18} />
                        Connect on LinkedIn
                    </a>
                    <a
                        href="/resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-4 border border-brand-charcoal/20 dark:border-brand-cream/20 text-brand-charcoal dark:text-brand-cream/80 font-medium rounded-sm hover:border-brand-purple hover:text-brand-purple dark:hover:border-brand-gold dark:hover:text-brand-gold transition-all duration-300"
                    >
                        Resume
                    </a>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
                    className="mt-10 max-w-sm font-mono text-xs leading-relaxed text-brand-charcoal/75 dark:text-brand-cream/75 bg-white/70 dark:bg-brand-surface/80 border border-brand-charcoal/15 dark:border-brand-cream/15 rounded-sm shadow-md"
                >
                    <div className="flex items-center gap-1.5 px-3 py-2 border-b border-brand-charcoal/10 dark:border-brand-cream/10">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-400/70"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-green-400/70"></span>
                        <span className="ml-2 text-[10px] uppercase tracking-wider text-brand-charcoal/50 dark:text-brand-cream/50">
                            now.ts
                        </span>
                    </div>
                    <pre className="px-4 py-3 whitespace-pre">
                        <span className="text-brand-purple dark:text-brand-gold">const</span>
                        <span className="text-brand-navy dark:text-brand-cream"> focus</span>
                        {" = ["}
                        {"\n  "}<span className="text-brand-charcoal/90 dark:text-brand-cream/90">&quot;Multimodal RAG&quot;</span>{","}
                        {"\n  "}<span className="text-brand-charcoal/90 dark:text-brand-cream/90">&quot;CV pipelines @ scale&quot;</span>{","}
                        {"\n  "}<span className="text-brand-charcoal/90 dark:text-brand-cream/90">&quot;Real-time inference&quot;</span>{","}
                        {"\n];"}
                    </pre>
                </motion.div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                className="relative flex justify-center lg:justify-end"
            >
                <div className="group relative w-80 h-[420px] lg:w-[440px] lg:h-[560px]">
                    {/* Matte / outer card */}
                    <div className="absolute inset-0 flex flex-col p-3 bg-brand-cream/70 dark:bg-brand-surface/80 border border-brand-charcoal/15 dark:border-brand-cream/15 shadow-[0_30px_60px_-30px_rgba(12,35,64,0.25)] dark:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)] transition-all duration-500 ease-out group-hover:-translate-y-0.5 group-hover:shadow-[0_40px_70px_-30px_rgba(12,35,64,0.3)] dark:group-hover:shadow-[0_40px_70px_-30px_rgba(0,0,0,0.7)]">
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
                                className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(12,35,64,0.18)_100%)] dark:bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.35)_100%)]"
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
                        <div className="flex-1 mt-3 pt-3 px-1 border-t border-brand-charcoal/10 dark:border-brand-cream/10 flex flex-col justify-center gap-1.5">
                            <div className="flex items-baseline justify-between gap-3">
                                <span className="font-display text-lg lg:text-xl text-brand-navy dark:text-brand-cream tracking-tight leading-none">
                                    Rohan Singh
                                </span>
                                <span className="flex items-center gap-1.5 font-mono text-[10px] tracking-[0.18em] uppercase text-brand-charcoal/55 dark:text-brand-cream/50 whitespace-nowrap">
                                    <span className="w-1 h-1 rounded-full bg-brand-gold" />
                                    UC Irvine &rsquo;28
                                </span>
                            </div>
                            <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-brand-charcoal/45 dark:text-brand-cream/40 leading-none">
                                Software &middot; Machine Learning
                            </span>
                        </div>
                    </div>
                </div>

                {/* Abstract "Bridge" Element */}
                <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-brand-gold/10 -z-10 blur-xl"></div>
            </motion.div>
        </div>
    </section>
);
