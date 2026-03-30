"use client";

import { motion } from "framer-motion";
import { Award, BookOpen } from "lucide-react";

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
];

export const Education = () => (
    <section id="education" className="py-32 bg-brand-cream relative">
        <div className="container mx-auto px-6 max-w-5xl">

            {/* Section header */}
            <div className="mb-20">
                <h2 className="text-4xl lg:text-5xl font-bold text-brand-navy mb-4 font-display">
                    Education
                </h2>
                <div className="w-full h-px bg-brand-charcoal/10" />
            </div>

            {/* University Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="border border-brand-charcoal/10 bg-white p-8 md:p-10 mb-12"
            >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                    {/* Left: school info */}
                    <div>
                        <p className="text-xs font-medium tracking-widest text-brand-purple uppercase mb-2">
                            University of California, Irvine
                        </p>
                        <h3 className="text-2xl font-bold text-brand-navy font-display mb-1">
                            B.S. Computer Science
                        </h3>
                        <p className="text-sm text-brand-charcoal/50 font-light">
                            Sept 2024 – Jun 2027 (expected)
                        </p>
                    </div>

                    {/* Right: stats */}
                    <div className="flex flex-col sm:flex-row gap-4 md:text-right">
                        {/* GPA pill */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 border border-brand-charcoal/10 text-sm font-medium text-brand-charcoal/70 self-start md:self-auto">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-gold flex-shrink-0" />
                            GPA 3.92
                        </div>

                        {/* Dean's Honor List pill */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-navy/5 border border-brand-navy/10 text-sm font-medium text-brand-navy self-start md:self-auto">
                            <Award size={14} className="text-brand-gold flex-shrink-0" />
                            Dean&apos;s Honor List — All Quarters
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Relevant Coursework */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            >
                <div className="flex items-center gap-3 mb-6">
                    <BookOpen size={16} className="text-brand-purple" />
                    <span className="text-sm font-medium tracking-widest text-brand-charcoal/50 uppercase">
                        Relevant Coursework
                    </span>
                </div>

                <div className="flex flex-wrap gap-3">
                    {COURSES.map((course) => (
                        <div
                            key={course.code}
                            className="group flex items-center gap-2 px-4 py-2 border border-brand-charcoal/10 bg-white hover:border-brand-purple/40 hover:bg-brand-purple/5 transition-all duration-300 cursor-default"
                        >
                            <span className="text-xs font-bold text-brand-purple/70 group-hover:text-brand-purple transition-colors">
                                {course.code}
                            </span>
                            <span className="text-sm text-brand-charcoal/70 font-light">
                                {course.name}
                            </span>
                        </div>
                    ))}
                </div>
            </motion.div>

        </div>
    </section>
);
