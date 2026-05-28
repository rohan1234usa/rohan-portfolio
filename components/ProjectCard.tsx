"use client";

import { MouseEvent, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { ProjectModal } from "./ProjectModal";
import { TechIcon } from "./TechIcon";
import { StaggerItem } from "./motion/StaggerGroup";

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

const MAX_TILT = 4; // degrees

export const ProjectCard = ({ project }: { project: ProjectProps }) => {
    const reduce = useReducedMotion();
    const [open, setOpen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const mouseX = useMotionValue(0); // -0.5 .. 0.5
    const mouseY = useMotionValue(0);

    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-MAX_TILT, MAX_TILT]), {
        stiffness: 220,
        damping: 22,
        mass: 0.4,
    });
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [MAX_TILT, -MAX_TILT]), {
        stiffness: 220,
        damping: 22,
        mass: 0.4,
    });

    const images = project.images && project.images.length > 0
        ? project.images
        : (project.image ? [project.image] : []);
    const hasThumbnail = images.length > 0;

    const onMove = (e: MouseEvent<HTMLButtonElement>) => {
        if (reduce || !buttonRef.current) return;
        const rect = buttonRef.current.getBoundingClientRect();
        const nx = (e.clientX - rect.left) / rect.width - 0.5;
        const ny = (e.clientY - rect.top) / rect.height - 0.5;
        mouseX.set(nx);
        mouseY.set(ny);
    };
    const onLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <>
            <StaggerItem className="[perspective:1200px] h-full">
                <motion.button
                    ref={buttonRef}
                    type="button"
                    onClick={() => setOpen(true)}
                    onMouseMove={onMove}
                    onMouseLeave={onLeave}
                    whileHover={{ y: -3 }}
                    style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                    aria-label={`Open details for ${project.title}`}
                    className="group relative w-full text-left bg-surface border border-line hover:border-accent/50 transition-colors duration-300 ease-out flex flex-col h-full outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-sm overflow-hidden"
                >
                    {/* Thumbnail */}
                    <div className="relative aspect-video bg-bg-subtle overflow-hidden">
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
                            className="absolute top-3 right-3 p-2 rounded-full bg-surface/85 backdrop-blur text-fg hover:bg-surface hover:text-accent transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        >
                            <ArrowUpRight size={16} />
                        </a>
                    </div>

                    {/* Body */}
                    <div className="p-8 flex flex-col flex-grow">
                        <h3 className="font-bold text-2xl text-fg font-display group-hover:text-accent transition-colors mb-4">
                            {project.title}
                        </h3>

                        <p className="text-fg-soft mb-8 text-base leading-relaxed flex-grow font-light">
                            {project.desc}
                        </p>

                        <div className="flex flex-wrap gap-2 mt-auto">
                            {project.tech.map((t, i) => (
                                <span
                                    key={i}
                                    style={{
                                        transitionDelay: `${i * 25}ms`,
                                    }}
                                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-bg-subtle text-fg-soft text-xs font-medium tracking-wide rounded-sm border border-transparent group-hover:border-accent/30 transition-all duration-300 ease-out group-hover:-translate-y-0.5"
                                >
                                    <TechIcon name={t} />
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>
                </motion.button>
            </StaggerItem>

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
