"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const LINKS = {
    email: "mailto:rohans9@uci.edu",
};

export const Hero = () => (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-gradient-hero">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 background-pattern"></div>

        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
            >
                <div className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-wider text-brand-gold uppercase bg-brand-navy/30 border border-brand-gold/20 rounded-full backdrop-blur-sm">
                    CS @ UC Irvine • GPA 3.9
                </div>
                <h1 className="text-4xl lg:text-6xl font-extrabold text-white leading-tight mb-6 font-display">
                    Building the Future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-brand-yellow">Computer Vision</span> & AI.
                </h1>
                <p className="text-lg text-brand-blue-light/90 mb-8 max-w-lg leading-relaxed">
                    I'm Rohan Singh. I bridge the gap between academic research and
                    production code, specializing in RAG pipelines, Generative AI, and YOLO
                    architectures.
                    {/* Accent Line */}
                    <span className="block w-16 h-1 bg-brand-gold mt-6 rounded-full"></span>
                </p>

                <div className="flex flex-wrap gap-4">
                    <a
                        href="#projects"
                        className="px-8 py-3 bg-brand-gold text-brand-navy font-bold rounded-lg hover:bg-brand-yellow transition-all shadow-lg hover:shadow-brand-gold/20 transform hover:-translate-y-0.5"
                    >
                        View Work
                    </a>
                    <a
                        href={LINKS.email}
                        className="px-8 py-3 border border-brand-lavender/30 text-white font-medium rounded-lg hover:bg-white/10 transition-colors backdrop-blur-sm"
                    >
                        Contact Me
                    </a>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative flex justify-center"
            >
                {/* Decorative Blob */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-purple/30 rounded-full blur-3xl -z-10"></div>

                <div className="relative w-72 h-72 lg:w-[400px] lg:h-[400px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10 rotate-3 hover:rotate-0 transition-all duration-500">
                    <Image
                        src="/images/profile.png"
                        alt="Rohan Singh"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            </motion.div>
        </div>

        {/* Bottom Wave/Bridge Element could go here */}
    </section>
);
