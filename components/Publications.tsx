"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import { BookOpen, ArrowUpRight } from "lucide-react";
import { Reveal } from "./motion/Reveal";
import { StaggerGroup, StaggerItem } from "./motion/StaggerGroup";
import { EASE_OUT_QUAD, VIEWPORT } from "./motion/tokens";

interface Publication {
    title: string;
    /** In Rohan's own wording from his résumé, author strings included. */
    authors: string[];
    conference: string;
    date: string;
    /** A later home for the same paper, shown under the conference line. */
    note?: string;
    link: string;
}

/** How Rohan's name appears in the author lists, so it can be set in bold. */
const SELF = new Set(["Rohan Singh", "Rohan S."]);

const PUBLICATIONS: Publication[] = [
    {
        title: "Enhancing Face Emotion Recognition with FACS-Based Synthetic Dataset Using Deep Learning Models",
        authors: ["Shiwangi M", "Shalu P", "Rohan Singh"],
        conference: "8th International Conference on Computer Vision & Image Processing",
        date: "Nov 2023",
        link: "https://iitjammu.ac.in/cvip2023/index.html",
    },
    {
        title: "Face Emotion Recognition with New Auto Generated Emotions Dataset: EMOTE-2023",
        authors: ["Shalu P", "Insha L", "Rohan S.", "Shiwangi M."],
        conference: "World Conference on Science Engineering and Technology (WCSET)",
        date: "Mar 2023",
        note: "Subsequently published in Institute of Research and Journals (IRAJ)",
        link: "https://digitalxplore.org/proceeding.php?pid=1914",
    },
];

export const Publications = () => {
    return (
        <section id="publications" className="py-16 bg-bg-subtle">
            <div className="container mx-auto px-6 max-w-5xl">
                <Reveal className="mb-12">
                    <h2 className="text-4xl lg:text-5xl font-bold text-fg mb-4 font-display flex items-center gap-3">
                        <BookOpen className="text-accent" size={32} />
                        Publications
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
                <StaggerGroup className="grid gap-6" stagger={0.1}>
                    {PUBLICATIONS.map((pub) => (
                        <StaggerItem key={pub.title}>
                            <a
                                href={pub.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group block bg-surface p-6 rounded-sm border border-line hover:border-accent/50 transition-all duration-300"
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-bold text-lg text-fg group-hover:text-accent transition-colors font-display">
                                            {pub.title}
                                        </h3>
                                        <p className="text-sm text-fg-soft mt-2">
                                            {pub.authors.map((name, j) => (
                                                <Fragment key={name}>
                                                    {j > 0 && ", "}
                                                    {SELF.has(name) ? (
                                                        <strong className="font-semibold text-fg">{name}</strong>
                                                    ) : (
                                                        name
                                                    )}
                                                </Fragment>
                                            ))}
                                        </p>
                                        <p className="text-sm text-fg-soft mt-1 font-mono">
                                            {pub.conference} • {pub.date}
                                        </p>
                                        {pub.note && <p className="text-xs text-fg-soft mt-1">{pub.note}</p>}
                                    </div>
                                    <ArrowUpRight className="text-fg-muted group-hover:text-accent transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                </div>
                            </a>
                        </StaggerItem>
                    ))}
                </StaggerGroup>
            </div>
        </section>
    );
};
