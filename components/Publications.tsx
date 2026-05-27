"use client";

import { BookOpen, ArrowUpRight } from "lucide-react";

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
                <h2 className="text-4xl lg:text-5xl font-bold text-brand-navy dark:text-brand-cream mb-4 font-display flex items-center gap-3">
                    <BookOpen className="text-brand-purple dark:text-brand-gold" size={32} />
                    Publications
                </h2>
                <div className="w-full h-px bg-brand-charcoal/10 dark:bg-brand-cream/10 mb-12" />
                <div className="grid gap-6">
                    {PUBLICATIONS.map((pub, i) => (
                        <a
                            key={i}
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
                                <ArrowUpRight className="text-brand-lavender dark:text-brand-cream/50 group-hover:text-brand-purple dark:group-hover:text-brand-gold transition-colors" />
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};
