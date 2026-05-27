"use client";

import { motion } from "framer-motion";
import { BookOpen, ArrowUpRight } from "lucide-react";
import { Reveal } from "./motion/Reveal";
import { StaggerGroup, StaggerItem } from "./motion/StaggerGroup";
import { EASE_OUT_QUAD } from "./motion/tokens";

export const Publications = () => {
    const PUBLICATIONS = [
        {
            title: "Enhancing Face Emotion Recognition with FACS-Based Synthetic Dataset",
            conference: "8th International Conference on Computer Vision & Image Processing",
            date: "Nov 2023",
            link: "https://iitjammu.ac.in/cvip2023/index.html",
        },
        {
            title: "Face Emotion Recognition with New Auto Generated Emotions Dataset: EMOTE-2023",
            conference: "WCSET 2023 & IRAJ",
            date: "Mar 2023",
            link: "https://digitalxplore.org/proceeding.php?pid=1914",
        },
    ];

    return (
        <section id="publications" className="py-16 bg-brand-cream/30 dark:bg-brand-ink">
            <div className="container mx-auto px-6 max-w-5xl">
                <Reveal className="mb-12">
                    <h2 className="text-4xl lg:text-5xl font-bold text-brand-navy dark:text-brand-cream mb-4 font-display flex items-center gap-3">
                        <BookOpen className="text-brand-purple dark:text-brand-gold" size={32} />
                        Publications
                    </h2>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true, margin: "-10% 0px" }}
                        transition={{ duration: 0.7, delay: 0.15, ease: EASE_OUT_QUAD }}
                        style={{ transformOrigin: "0% 50%" }}
                        className="w-full h-px bg-brand-charcoal/10 dark:bg-brand-cream/10"
                    />
                </Reveal>
                <StaggerGroup className="grid gap-6" stagger={0.1}>
                    {PUBLICATIONS.map((pub, i) => (
                        <StaggerItem key={i}>
                            <a
                                href={pub.link}
                                className="group block bg-white dark:bg-brand-surface p-6 rounded-sm border border-brand-charcoal/10 dark:border-brand-cream/10 hover:border-brand-purple/50 dark:hover:border-brand-gold/50 transition-all duration-300"
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-bold text-lg text-brand-navy dark:text-brand-cream group-hover:text-brand-purple dark:group-hover:text-brand-gold transition-colors font-display">
                                            {pub.title}
                                        </h3>
                                        <p className="text-sm text-brand-charcoal/70 dark:text-brand-cream/70 mt-2 font-mono">
                                            {pub.conference} • {pub.date}
                                        </p>
                                    </div>
                                    <ArrowUpRight className="text-brand-lavender dark:text-brand-cream/50 group-hover:text-brand-purple dark:group-hover:text-brand-gold transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                </div>
                            </a>
                        </StaggerItem>
                    ))}
                </StaggerGroup>
            </div>
        </section>
    );
};
