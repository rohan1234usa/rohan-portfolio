"use client";

import { motion } from "framer-motion";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import Image from "next/image";

interface ProjectProps {
    title: string;
    tech: string[];
    desc: string;
    link: string;
    image: string;
    color: string;
}

export const ProjectCard = ({ project }: { project: ProjectProps }) => (
    <motion.div
        whileHover={{ y: -3 }}
        className="group relative bg-white border border-brand-charcoal/10 hover:border-brand-purple/50 transition-all duration-300 ease-out p-8 flex flex-col h-full"
    >
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
            <h3 className="font-bold text-2xl text-brand-navy font-display group-hover:text-brand-purple transition-colors">
                {project.title}
            </h3>
            <div className={`p-2 rounded-full bg-brand-navy/5 text-brand-navy group-hover:bg-brand-purple/10 group-hover:text-brand-purple transition-colors`}>
                <ArrowUpRight size={20} />
            </div>
        </div>

        {/* Description */}
        <p className="text-brand-charcoal/70 mb-8 text-base leading-relaxed flex-grow font-light">
            {project.desc}
        </p>

        {/* Tech Tags */}
        <div className="flex flex-wrap gap-2 mt-auto">
            {project.tech.map((t: string, i: number) => (
                <span
                    key={i}
                    className="px-3 py-1 bg-brand-charcoal/5 text-brand-charcoal/70 text-xs font-medium tracking-wide rounded-sm"
                >
                    {t}
                </span>
            ))}
        </div>
    </motion.div>
);
