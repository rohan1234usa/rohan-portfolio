"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotionSafe } from "./motion/useReducedMotionSafe";
import { ExternalLink, Briefcase } from "lucide-react";
import { useRef } from "react";
import { StaggerGroup, StaggerItem } from "./motion/StaggerGroup";
import { Reveal } from "./motion/Reveal";
import { EASE_OUT_QUAD, VIEWPORT } from "./motion/tokens";
import { HighlightText, highlightKey, type Highlight } from "./Highlight";

interface JobProps {
    company: string;
    role: string;
    date: string;
    location: string;
    url?: string;
    /** Plain text, or `{ lead, text }` to name the stage of work a bullet covers, as Merge's do. */
    points: Highlight[];
}

const ExperienceItem = ({ job, isLast }: { job: JobProps; isLast: boolean }) => {
    const reduce = useReducedMotionSafe();
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
                {job.url && (
                    <a
                        href={job.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${job.company} website`}
                        className="opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                    >
                        <ExternalLink size={12} />
                    </a>
                )}
            </div>

            <StaggerGroup as="ul" className="space-y-3" stagger={0.06}>
                {job.points.map((point) => (
                    <StaggerItem
                        as="li"
                        key={highlightKey(point)}
                        y={10}
                        className="flex items-start gap-4 text-fg-soft text-sm leading-relaxed font-light"
                    >
                        <div aria-hidden className="w-1.5 h-1.5 bg-accent-warm rounded-full mt-2 flex-shrink-0"></div>
                        <span>
                            <HighlightText highlight={point} />
                        </span>
                    </StaggerItem>
                ))}
            </StaggerGroup>
        </StaggerItem>
    );
};

const EXPERIENCE: JobProps[] = [
    {
        // No `url`: mergecampus.com is deliberately withheld until it's polished.
        // Add it here (and the store link on the Projects card) on launch day.
        company: "Merge",
        role: "Founding Designer & Full-Stack Engineer",
        date: "March 2026 – Present",
        location: "Irvine, CA",
        // One bullet per stage of the build, scope first, with an instance only as its evidence.
        // Figures are from Merge’s merged history as of 2026-09-23. The "N+" counts are floors that
        // stay true; the shares (half the data model, most rules, ~3/4 of test files) can shrink as
        // the other engineer merges, so recheck those. Recount everything before editing.
        points: [
            {
                lead: "Product design",
                text: "Originated Merge as a carpool app and widened it into a social platform for real-life plans with friends, then defined it through student personas, ranked use cases, feature specs, and a 62-screen clickable prototype."
            },
            {
                lead: "Architecture",
                text: "One of two engineers (450+ of the team’s 1,150+ merged PRs) and the lead on system design for a Flutter + Firebase app with 110+ TypeScript Cloud Functions, from half its data model to the access model where the server, not the app, decides what each person sees."
            },
            {
                lead: "Pipelines",
                text: "Built a Gemini place recommender that plans its own Google Places searches yet can’t invent a fact; receipt scanning into itemized bill splits; a travel-time and timeline solver; route optimization for carpools; and detour-based matching for peer-to-peer rides."
            },
            {
                lead: "Security & quality",
                text: "Wrote most of the Firestore security rules and about three quarters of the app’s 1,600+ test files and set up its first CI; fixes land test-first, re-verified by deliberately breaking them."
            }
        ]
    },
    {
        company: "Imentiv AI",
        role: "Full-Stack Engineer",
        date: "June 2026 – Present",
        location: "Cupertino, CA",
        url: "https://www.imentiv.ai",
        points: [
            "Architected the PitchSense pipeline behind Pitch Coach: one FastAPI service, three products, with Postgres and S3 call history.",
            "Grounded every AI answer in a real measurement: baseline-normalized scores and transcript-derived delivery mechanics.",
            "Scoped SceneSense, a 0→1 AI acting coach that grades a take against the script's emotional arc."
        ]
    },
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

export const Experience = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start 80%", "end 60%"],
    });
    const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);


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
