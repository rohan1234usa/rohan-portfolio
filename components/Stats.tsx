"use client";

import { StaggerGroup, StaggerItem } from "./motion/StaggerGroup";
import { CountUp } from "./motion/CountUp";

interface Stat {
    value: string;
    label: string;
}

const STATS: Stat[] = [
    { value: "3+", label: "Shipped Products" },
    { value: "2", label: "Publications" },
    { value: "3.92", label: "GPA at UCI" },
    { value: "3+", label: "Years in ML/CV" },
];

export const Stats = () => (
    <section className="bg-bg">
        <div className="container mx-auto px-6 max-w-5xl">
            <StaggerGroup
                className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-y border-line"
                stagger={0.1}
            >
                {STATS.map((stat, i) => (
                    <StaggerItem key={i} className="text-center md:text-left">
                        <div className="text-3xl md:text-4xl font-display font-bold text-fg tracking-tight">
                            <CountUp value={stat.value} />
                        </div>
                        <div className="mt-2 text-xs uppercase tracking-wider text-fg-muted font-medium">
                            {stat.label}
                        </div>
                    </StaggerItem>
                ))}
            </StaggerGroup>
        </div>
    </section>
);
