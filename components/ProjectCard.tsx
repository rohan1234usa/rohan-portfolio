"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
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
        whileHover={{ y: -5 }}
        className="group relative rounded-2xl bg-white border border-brand-lavender shadow-sm overflow-hidden flex flex-col h-full hover:border-brand-gold hover:shadow-lg transition-all duration-300"
    >
        {/* Image Section */}
        <div
            className={`relative h-48 w-full bg-gradient-to-r ${project.color} flex items-center justify-center overflow-hidden`}
        >
            <div className="absolute inset-0 bg-brand-navy/10 group-hover:bg-brand-navy/0 transition-colors"></div>
            {/* 
          If you have actual images, uncomment this:
          <Image src={project.image} alt={project.title} fill className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-500" />
      */}
            <h3 className="relative z-10 text-white font-bold text-2xl drop-shadow-md px-4 text-center font-display">
                {project.title}
            </h3>
        </div>

        {/* Content Section */}
        <div className="p-6 flex flex-col flex-grow">
            <div className="flex justify-between items-start mb-4">
                <div className="flex flex-wrap gap-2">
                    {project.tech.map((t: string, i: number) => (
                        <span
                            key={i}
                            className="px-2.5 py-1 bg-brand-blue-light text-brand-navy border border-brand-blue-light text-[10px] font-bold uppercase tracking-wide rounded-full"
                        >
                            {t}
                        </span>
                    ))}
                </div>
            </div>
            <p className="text-brand-charcoal mb-6 text-sm leading-relaxed flex-grow">
                {project.desc}
            </p>
            <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-brand-purple font-semibold text-sm hover:text-brand-navy hover:underline mt-auto transition-colors"
            >
                View Project <ExternalLink size={14} />
            </a>
        </div>
    </motion.div>
);
