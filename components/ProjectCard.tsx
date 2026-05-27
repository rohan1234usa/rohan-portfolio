"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { ProjectModal } from "./ProjectModal";

interface ProjectProps {
    title: string;
    tech: string[];
    desc: string;
    link: string;
    image: string;
    color: string;
    images?: string[];
    details?: string[];
}

export const ProjectCard = ({ project }: { project: ProjectProps }) => {
    const [open, setOpen] = useState(false);
    const images = project.images && project.images.length > 0
        ? project.images
        : (project.image ? [project.image] : []);
    const hasThumbnail = images.length > 0;

    return (
        <>
            <motion.button
                type="button"
                onClick={() => setOpen(true)}
                whileHover={{ y: -3 }}
                aria-label={`Open details for ${project.title}`}
                className="group relative w-full text-left bg-white dark:bg-brand-surface border border-brand-charcoal/10 dark:border-brand-cream/10 hover:border-brand-purple/50 dark:hover:border-brand-gold/50 transition-all duration-300 ease-out flex flex-col h-full outline-none focus-visible:ring-2 focus-visible:ring-brand-purple focus-visible:ring-offset-2 rounded-sm overflow-hidden"
            >
                {/* Thumbnail */}
                <div className="relative aspect-video bg-brand-cream dark:bg-brand-ink overflow-hidden">
                    {hasThumbnail ? (
                        <Image
                            src={images[0]}
                            alt={`${project.title} preview`}
                            fill
                            sizes="(min-width: 768px) 50vw, 100vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                    ) : (
                        <div className={`absolute inset-0 bg-gradient-to-br ${project.color}`} />
                    )}

                    {/* External-link shortcut, stops propagation */}
                    <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        aria-label={`Open ${project.title} live demo`}
                        className="absolute top-3 right-3 p-2 rounded-full bg-white/85 dark:bg-brand-ink/85 backdrop-blur text-brand-navy dark:text-brand-cream hover:bg-white dark:hover:bg-brand-ink hover:text-brand-purple dark:hover:text-brand-gold transition-colors"
                    >
                        <ArrowUpRight size={16} />
                    </a>
                </div>

                {/* Body */}
                <div className="p-8 flex flex-col flex-grow">
                    <h3 className="font-bold text-2xl text-brand-navy dark:text-brand-cream font-display group-hover:text-brand-purple dark:group-hover:text-brand-gold transition-colors mb-4">
                        {project.title}
                    </h3>

                    <p className="text-brand-charcoal/70 dark:text-brand-cream/70 mb-8 text-base leading-relaxed flex-grow font-light">
                        {project.desc}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-auto">
                        {project.tech.map((t, i) => (
                            <span
                                key={i}
                                className="px-3 py-1 bg-brand-charcoal/5 dark:bg-brand-cream/10 text-brand-charcoal/70 dark:text-brand-cream/70 text-xs font-medium tracking-wide rounded-sm border border-transparent group-hover:border-brand-purple/10 dark:group-hover:border-brand-gold/20 transition-colors"
                            >
                                {t}
                            </span>
                        ))}
                    </div>
                </div>
            </motion.button>

            <ProjectModal
                isOpen={open}
                onClose={() => setOpen(false)}
                title={project.title}
                tech={project.tech}
                desc={project.desc}
                link={project.link}
                images={images}
                details={project.details ?? []}
                color={project.color}
            />
        </>
    );
};
