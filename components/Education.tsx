"use client";

import { motion } from "framer-motion";
import { Award, BookOpen, BadgeCheck, GraduationCap } from "lucide-react";
import { Reveal } from "./motion/Reveal";
import { StaggerGroup, StaggerItem } from "./motion/StaggerGroup";
import { EASE_OUT_QUAD, VIEWPORT } from "./motion/tokens";

const COURSES = [
    { code: "CS 171", name: "Artificial Intelligence" },
    { code: "CS 178", name: "Machine/Data Mining" },
    { code: "CS 177", name: "Probability in CS" },
    { code: "CS 121", name: "Information Retrieval" },
    { code: "CS 143A", name: "Operating Systems" },
    { code: "ICS 46", name: "Data Structures & Analysis" },
    { code: "ICS 45C", name: "Programming in C/C++" },
    { code: "INF 43", name: "Software Engineering" },
    { code: "STATS 67", name: "Probability & Statistics" },
    { code: "MATH 3A", name: "Linear Algebra" },
];

export const Education = () => (
    <section id="education" className="py-16 bg-bg relative">
        <div className="container mx-auto px-6 max-w-5xl">

            {/* Section header */}
            <Reveal className="mb-12">
                <h2 className="text-4xl lg:text-5xl font-bold text-fg mb-4 font-display flex items-center gap-3">
                    <GraduationCap className="text-accent" size={32} />
                    Education
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

            <StaggerGroup stagger={0.15}>
                {/* University Card */}
                <StaggerItem className="border border-line bg-surface p-8 md:p-10 mb-12">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                        {/* Left: school info */}
                        <div>
                            <p className="text-xs font-medium tracking-widest text-accent uppercase mb-2">
                                University of California, Irvine
                            </p>
                            <h3 className="text-2xl font-bold text-fg font-display mb-1">
                                B.S. Computer Science
                            </h3>
                            <p className="text-sm text-fg-muted font-light">
                                Sept 2024 – Jun 2027 (expected)
                            </p>
                        </div>

                        {/* Right: stats */}
                        <div className="flex flex-wrap gap-3 md:text-right items-start">
                            {/* GPA pill */}
                            <div className="inline-flex items-center gap-2 px-4 py-2 border border-line text-sm font-medium text-fg-soft self-start md:self-auto">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent-warm flex-shrink-0" />
                                GPA 3.92
                            </div>

                            {/* Dean's Honor List pill */}
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-bg-subtle border border-line text-sm font-medium text-fg self-start md:self-auto">
                                <Award size={14} className="text-accent-warm flex-shrink-0" />
                                Dean&apos;s Honor List — All Quarters
                            </div>

                            {/* Certification pill */}
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-bg-subtle border border-line text-sm font-medium text-fg self-start md:self-auto">
                                <BadgeCheck size={14} className="text-accent-warm flex-shrink-0" />
                                Google Cloud Generative AI Leader
                            </div>
                        </div>
                    </div>
                </StaggerItem>

                {/* Relevant Coursework */}
                <StaggerItem>
                    <div className="flex items-center gap-3 mb-6">
                        <BookOpen size={16} className="text-accent" />
                        <span className="text-sm font-medium tracking-widest text-fg-muted uppercase">
                            Relevant Coursework
                        </span>
                    </div>

                    <StaggerGroup className="flex flex-wrap gap-3" stagger={0.04}>
                        {COURSES.map((course) => (
                            <StaggerItem
                                key={course.code}
                                y={8}
                                className="group flex items-center gap-2 px-4 py-2 border border-line bg-surface hover:border-accent/40 hover:bg-accent/5 transition-all duration-300 cursor-default"
                            >
                                <span className="text-xs font-bold text-accent/80 group-hover:text-accent transition-colors">
                                    {course.code}
                                </span>
                                <span className="text-sm text-fg-soft font-light">
                                    {course.name}
                                </span>
                            </StaggerItem>
                        ))}
                    </StaggerGroup>
                </StaggerItem>
            </StaggerGroup>

        </div>
    </section>
);
