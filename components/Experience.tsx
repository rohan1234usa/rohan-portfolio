"use client";

import { ExternalLink, Briefcase } from "lucide-react";

interface JobProps {
    company: string;
    role: string;
    date: string;
    location: string;
    url: string;
    points: string[];
}

const ExperienceItem = ({ job, isLast }: { job: JobProps; isLast: boolean }) => (
    <div className={`relative pl-12 group ${isLast ? "" : "pb-12"}`}>
        {/* Dot */}
        <div className="absolute left-[10px] top-1 w-3 h-3 rounded-full bg-brand-gold border-4 border-white dark:border-brand-ink ring-1 ring-brand-charcoal/15 dark:ring-brand-cream/15 group-hover:bg-brand-purple dark:group-hover:bg-brand-yellow group-hover:scale-110 transition-all duration-300"></div>

        {/* Date eyebrow */}
        <div className="text-xs uppercase tracking-wider text-brand-charcoal/60 dark:text-brand-cream/75 font-medium mb-2">
            {job.date} · {job.location}
        </div>

        <h3 className="font-bold text-xl text-brand-navy dark:text-brand-cream font-display mb-1">{job.role}</h3>
        <div className="text-brand-purple dark:text-brand-gold font-medium text-sm mb-4 flex items-center gap-2">
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

        <ul className="space-y-3">
            {job.points.map((point: string, i: number) => (
                <li
                    key={i}
                    className="flex items-start gap-4 text-brand-charcoal/80 dark:text-brand-cream/80 text-sm leading-relaxed font-light"
                >
                    <div className="w-1.5 h-1.5 bg-brand-gold rounded-full mt-2 flex-shrink-0"></div>
                    <span>{point}</span>
                </li>
            ))}
        </ul>
    </div>
);

export const Experience = () => {
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
        <section id="experience" className="py-32 bg-white dark:bg-brand-ink relative">
            <div className="container mx-auto px-6 max-w-5xl relative z-10">
                <div className="mb-20">
                    <h2 className="text-4xl lg:text-5xl font-bold text-brand-navy dark:text-brand-cream mb-4 font-display flex items-center gap-3">
                        <Briefcase className="text-brand-purple dark:text-brand-gold" size={32} />
                        Experience
                    </h2>
                    <div className="w-full h-px bg-brand-charcoal/10 dark:bg-brand-cream/10"></div>
                </div>

                <div className="relative">
                    {/* Vertical rule */}
                    <div className="absolute left-4 top-2 bottom-2 w-px bg-brand-charcoal/15 dark:bg-brand-cream/15"></div>
                    {EXPERIENCE.map((job, index) => (
                        <ExperienceItem
                            key={index}
                            job={job}
                            isLast={index === EXPERIENCE.length - 1}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};
