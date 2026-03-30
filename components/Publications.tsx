"use client";

import { BookOpen, ExternalLink, ArrowUpRight } from "lucide-react";

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
        <section className="py-16 bg-brand-cream/30">
            <div className="container mx-auto px-6 max-w-4xl">
                <h2 className="text-3xl font-bold text-brand-navy mb-12 flex items-center gap-3 font-display">
                    <BookOpen className="text-brand-purple" /> Publications
                </h2>
                <div className="grid gap-6">
                    {PUBLICATIONS.map((pub, i) => (
                        <a
                            key={i}
                            href={pub.link}
                            className="group block bg-white p-6 rounded-sm border border-brand-charcoal/10 hover:border-brand-purple/50 transition-all duration-300"
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-bold text-lg text-brand-navy group-hover:text-brand-purple transition-colors font-display">
                                        {pub.title}
                                    </h3>
                                    <p className="text-sm text-brand-charcoal/70 mt-2 font-mono">
                                        {pub.conference} • {pub.date}
                                    </p>
                                </div>
                                <ArrowUpRight className="text-brand-lavender group-hover:text-brand-purple transition-colors" />
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};
