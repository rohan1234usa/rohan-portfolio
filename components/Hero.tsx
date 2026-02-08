"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const LINKS = {
    email: "mailto:rohans9@uci.edu",
};

export const Hero = () => (
    <section className="relative pt-40 pb-32 lg:pt-56 lg:pb-40 overflow-hidden">
        <div className="container mx-auto px-6 grid lg:grid-cols-[1.2fr_0.8fr] gap-16 items-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 text-xs font-bold tracking-[0.2em] text-brand-navy uppercase border-b border-brand-gold/50">
                    CS @ UC Irvine
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-gold"></span>
                    GPA 3.89
                </div>

                <h1 className="text-5xl lg:text-7xl font-bold text-brand-navy leading-[1.1] mb-8 font-display tracking-tight">
                    Building the Future of <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-navy">
                        Intelligent Systems
                    </span>
                    <span className="text-brand-gold">.</span>
                </h1>

                <p className="text-xl text-brand-charcoal/80 mb-10 max-w-lg leading-relaxed font-light">
                    I bridge the gap between <span className="font-medium text-brand-purple">academic research</span> and <span className="font-medium text-brand-navy">production code</span>.
                    Specializing in RAG pipelines, Generative AI, and Scalable Architectures.
                </p>

                <div className="flex flex-wrap gap-6">
                    <a
                        href="#projects"
                        className="px-8 py-4 bg-brand-navy text-white font-medium rounded-sm hover:bg-brand-purple transition-colors duration-300 shadow-xl shadow-brand-navy/10"
                    >
                        View Work
                    </a>
                    <a
                        href="/resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-4 border-b-2 border-brand-charcoal/10 text-brand-charcoal font-medium hover:border-brand-purple hover:text-brand-purple transition-all duration-300"
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
                <div className="relative w-80 h-96 lg:w-[450px] lg:h-[550px] overflow-hidden transition-all duration-700 ease-in-out shadow-2xl shadow-brand-navy/20">
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
