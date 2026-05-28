"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ExternalLink, Briefcase } from "lucide-react";
import { useRef } from "react";
import { StaggerGroup, StaggerItem } from "./motion/StaggerGroup";
import { Reveal } from "./motion/Reveal";
import { EASE_OUT_QUAD, VIEWPORT } from "./motion/tokens";

interface JobProps {
    company: string;
    role: string;
    date: string;
    location: string;
    url: string;
    points: string[];
}

const ExperienceItem = ({ job, isLast }: { job: JobProps; isLast: boolean }) => {
    const reduce = useReducedMotion();
    return (
        <StaggerItem className={`relative pl-12 group ${isLast ? "" : "pb-12"}`}>
            {/* Dot */}
            <motion.div
                initial={{ scale: reduce ? 1 : 0 }}
                whileInView={{ scale: 1 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                className="absolute left-[10px] top-1 w-3 h-3 rounded-full bg-accent-warm border-4 border-surface ring-1 ring-line group-hover:bg-accent group-hover:scale-110 transition-colors duration-300"
            />

            {/* Date eyebrow */}
            <div className="text-xs uppercase tracking-wider text-fg-muted font-medium mb-2">
                {job.date} · {job.location}
            </div>

            <h3 className="font-bold text-xl text-fg font-display mb-1">{job.role}</h3>
            <div className="text-accent font-medium text-sm mb-4 flex items-center gap-2">
                {job.company}
                <a
                    href={job.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${job.company} website`}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                    <ExternalLink size={12} />
                </a>
            </div>

            <StaggerGroup as="ul" className="space-y-3" stagger={0.06}>
                {job.points.map((point: string, i: number) => (
                    <StaggerItem
                        as="li"
                        key={i}
                        y={10}
                        className="flex items-start gap-4 text-fg-soft text-sm leading-relaxed font-light"
                    >
                        <div className="w-1.5 h-1.5 bg-accent-warm rounded-full mt-2 flex-shrink-0"></div>
                        <span>{point}</span>
                    </StaggerItem>
                ))}
            </StaggerGroup>
        </StaggerItem>
    );
};

export const Experience = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start 80%", "end 60%"],
    });
    const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

    const EXPERIENCE = [
        {
            company: "Imentiv AI",
            role: "AI/Machine Learning Intern",
            date: "June 2025 – Sept 2025",
            location: "Cupertino, CA",
            url: "https://www.imentiv.ai",
            points: [
                "Boosted face detection accuracy by 6% via automated ground-truth validation pipelines, eliminating false positives.",
                "Implemented face re-identification tracking using dynamic placeholders, validated against ByteTrack and BoT-FaceSORT.",
                "Led comparative evaluations that drove the migration from legacy models to optimized YOLO architectures."
            ]
        },
        {
            company: "Imentiv AI",
            role: "AI/Machine Learning Intern",
            date: "June 2024 – Sept 2024",
            location: "Cupertino, CA",
            url: "https://www.imentiv.ai",
            points: [
                "Engineered an image deduplication tool using DINOv2 and Faiss, removing 95% of redundancies to refine ML datasets.",
                "Developed algorithms to extract unique video frames, creating diverse datasets for model training.",
                "Built a facial analysis tool using YOLOv8 to automate emotion labeling across large video datasets."
            ]
        },
        {
            company: "Asterbyte Software Systems",
            role: "Software Engineer Intern",
            date: "June 2023 – Aug 2023",
            location: "Remote",
            url: "https://asterbyte.com/",
            points: [
                "Designed ML solutions for emotion detection on human faces in videos.",
                "Generated synthetic training data using Unreal Engine MetaHumans to improve model robustness.",
                "Published research on facial emotion recognition at WCSET 2023."
            ]
        },
        {
            company: "Asterbyte Software Systems",
            role: "Android Developer Intern",
            date: "June 2022 – Aug 2022",
            location: "Remote",
            url: "https://asterbyte.com/",
            points: [
                "Developed Hue Christmas, a Philips Hue app that plays festive Christmas light shows.",
                "Reconstructed the Android app Pitch Prime from the ground up, revamping the GUI and optimizing performance.",
                "Translated the app from Spanish to English, expanding accessibility to a wider audience."
            ]
        }
    ];

    return (
        <section id="experience" className="py-32 bg-surface relative">
            <div className="container mx-auto px-6 max-w-5xl relative z-10">
                <Reveal className="mb-20">
                    <h2 className="text-4xl lg:text-5xl font-bold text-fg mb-4 font-display flex items-center gap-3">
                        <Briefcase className="text-accent" size={32} />
                        Experience
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

                <div ref={sectionRef} className="relative">
                    {/* Vertical rule — scroll-linked draw */}
                    <motion.div
                        aria-hidden
                        style={{ scaleY: lineScale, transformOrigin: "0% 0%" }}
                        className="absolute left-4 top-2 bottom-2 w-px bg-line-strong"
                    />
                    <StaggerGroup stagger={0.15}>
                        {EXPERIENCE.map((job, index) => (
                            <ExperienceItem
                                key={index}
                                job={job}
                                isLast={index === EXPERIENCE.length - 1}
                            />
                        ))}
                    </StaggerGroup>
                </div>
            </div>
        </section>
    );
};
