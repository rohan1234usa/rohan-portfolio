"use client";

import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";
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
                <div className="relative w-80 h-96 lg:w-[450px] lg:h-[550px] overflow-hidden transition-all duration-500 ease-out border border-brand-charcoal/10 dark:border-brand-cream/10">
                    <Image
                        src="/images/profile.png"
                        alt="Rohan Singh"
                        fill
                        className="object-cover"
                        priority
                    />
                    {/* Subtle Frame */}
                    <div className="absolute inset-0 border-[1px] border-white/20"></div>
                </div>

                {/* Abstract "Bridge" Element */}
                <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-brand-gold/10 -z-10 blur-xl"></div>
            </motion.div>
        </div>
    </section>
);
