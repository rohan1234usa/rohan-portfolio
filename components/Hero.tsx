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
                <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-8 text-xs font-medium tracking-wide text-brand-charcoal/70 border-b border-brand-charcoal/20">
                    CS @ UC Irvine
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-gold"></span>
                    GPA 3.92
                </div>

                <h1 className="text-5xl lg:text-7xl font-bold text-brand-navy leading-[1.1] mb-8 font-display tracking-tight">
                    Building the Future of <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-navy">
                        Intelligent Systems
                    </span>
                </h1>

                <p className="text-xl text-brand-charcoal/80 mb-10 max-w-lg leading-relaxed font-light">
                    Engineering intelligent systems that <span className="font-medium text-brand-navy">see, understand, and scale</span>.
                    Specializing in Computer Vision, Generative AI, and High-Performance Pipelines.
                </p>

                <div className="flex flex-wrap gap-4">
                    <a
                        href="#projects"
                        className="px-8 py-4 bg-brand-navy text-white font-medium rounded-sm hover:bg-brand-purple transition-colors duration-300"
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
                        className="px-8 py-4 border border-brand-charcoal/20 text-brand-charcoal font-medium rounded-sm hover:border-brand-purple hover:text-brand-purple transition-all duration-300"
                    >
                        Resume
                    </a>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                className="relative flex justify-center lg:justify-end"
            >
                <div className="relative w-80 h-96 lg:w-[450px] lg:h-[550px] overflow-hidden transition-all duration-500 ease-out border border-brand-charcoal/10">
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
