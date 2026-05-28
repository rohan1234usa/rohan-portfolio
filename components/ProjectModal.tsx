"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { TechIcon } from "./TechIcon";

interface ProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    tech: string[];
    desc: string;
    link: string;
    images: string[];
    details: string[];
    color: string;
}

export const ProjectModal = ({
    isOpen,
    onClose,
    title,
    tech,
    desc,
    link,
    images,
    details,
    color,
}: ProjectModalProps) => {
    const [index, setIndex] = useState(0);
    const hasImages = images.length > 0;

    useEffect(() => {
        if (!isOpen) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowLeft" && hasImages) setIndex((i) => (i - 1 + images.length) % images.length);
            if (e.key === "ArrowRight" && hasImages) setIndex((i) => (i + 1) % images.length);
        };
        document.addEventListener("keydown", onKey);
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = "";
        };
    }, [isOpen, hasImages, images.length, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onClick={onClose}
                    className="fixed inset-0 z-[100] bg-bg/85 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
                    role="dialog"
                    aria-modal="true"
                    aria-label={title}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96, y: 12 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: 12 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-surface-raised rounded-sm shadow-2xl border border-line"
                    >
                        <button
                            onClick={onClose}
                            aria-label="Close"
                            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-surface/80 backdrop-blur text-fg-soft hover:text-accent hover:bg-surface transition-colors"
                        >
                            <X size={18} />
                        </button>

                        {/* Image / gradient carousel */}
                        <div className="relative aspect-video bg-bg-subtle">
                            {hasImages ? (
                                <Image
                                    src={images[index]}
                                    alt={`${title} screenshot ${index + 1}`}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className={`absolute inset-0 bg-gradient-to-br ${color}`} />
                            )}

                            {hasImages && images.length > 1 && (
                                <>
                                    <button
                                        onClick={() => setIndex((i) => (i - 1 + images.length) % images.length)}
                                        aria-label="Previous image"
                                        className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-surface/80 backdrop-blur text-fg hover:bg-surface transition-colors"
                                    >
                                        <ChevronLeft size={18} />
                                    </button>
                                    <button
                                        onClick={() => setIndex((i) => (i + 1) % images.length)}
                                        aria-label="Next image"
                                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-surface/80 backdrop-blur text-fg hover:bg-surface transition-colors"
                                    >
                                        <ChevronRight size={18} />
                                    </button>
                                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                                        {images.map((_, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setIndex(i)}
                                                aria-label={`Go to image ${i + 1}`}
                                                className={`w-1.5 h-1.5 rounded-full transition-all ${i === index ? "bg-white w-4" : "bg-white/50"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Content */}
                        <div className="p-8">
                            <h3 className="text-3xl font-bold text-fg font-display mb-3">
                                {title}
                            </h3>
                            <p className="text-fg-soft leading-relaxed mb-6 font-light">
                                {desc}
                            </p>

                            {details.length > 0 && (
                                <ul className="space-y-3 mb-8">
                                    {details.map((d, i) => (
                                        <li
                                            key={i}
                                            className="flex items-start gap-4 text-fg-soft text-sm leading-relaxed font-light"
                                        >
                                            <div className="w-1.5 h-1.5 bg-accent-warm rounded-full mt-2 flex-shrink-0"></div>
                                            <span>{d}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}

                            <div className="flex flex-wrap gap-2 mb-8">
                                {tech.map((t, i) => (
                                    <span
                                        key={i}
                                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-bg-subtle text-fg-soft text-xs font-medium tracking-wide rounded-sm"
                                    >
                                        <TechIcon name={t} />
                                        {t}
                                    </span>
                                ))}
                            </div>

                            <a
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-fg text-bg font-medium rounded-sm hover:bg-accent hover:text-on-accent transition-colors duration-300"
                            >
                                View Live
                                <ArrowUpRight size={16} />
                            </a>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
