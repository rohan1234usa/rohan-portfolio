"use client";

import { motion } from "framer-motion";

interface Stat {
    value: string;
    label: string;
}

const STATS: Stat[] = [
    { value: "3+", label: "Shipped Products" },
    { value: "2", label: "Publications" },
    { value: "3.92", label: "GPA at UCI" },
    { value: "2+", label: "Years in ML/CV" },
];

export const Stats = () => (
    <section className="bg-brand-cream dark:bg-brand-ink">
        <div className="container mx-auto px-6 max-w-5xl">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-y border-brand-charcoal/10 dark:border-brand-cream/10"
            >
                {STATS.map((stat, i) => (
                    <div key={i} className="text-center md:text-left">
                        <div className="text-3xl md:text-4xl font-display font-bold text-brand-navy dark:text-brand-cream tracking-tight">
                            {stat.value}
                        </div>
                        <div className="mt-2 text-xs uppercase tracking-wider text-brand-charcoal/60 dark:text-brand-cream/75 font-medium">
                            {stat.label}
                        </div>
                    </div>
                ))}
            </motion.div>
        </div>
    </section>
);
