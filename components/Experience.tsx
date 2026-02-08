"use client";

import { ExternalLink, ChevronRight } from "lucide-react";

interface JobProps {
    company: string;
    role: string;
    date: string;
    location: string;
    url: string;
    points: string[];
}

const ExperienceItem = ({ job }: { job: JobProps }) => (
    <div className="relative pl-8 md:pl-0 group mb-12">
        <div className="md:grid md:grid-cols-[1fr_auto_1fr] md:gap-12 items-start">
            {/* Date (Left Side on Desktop) */}
            <div className="hidden md:block text-right pt-2">
                <span className="text-sm font-bold tracking-widest text-brand-charcoal/50 group-hover:text-brand-navy transition-colors font-mono uppercase">
                    {job.date}
                </span>
            </div>

            {/* Timeline Dot & Line */}
            <div className="hidden md:flex flex-col items-center h-full">
                <div className="w-3 h-3 rounded-full bg-brand-charcoal/20 group-hover:bg-brand-purple transition-all duration-300"></div>
                <div className="w-px h-full bg-brand-charcoal/10 -mt-2 group-last:hidden"></div>
            </div>

            {/* Content Card */}
            <div className="relative">
                <div className="md:hidden absolute -left-[35px] top-2 w-3 h-3 rounded-full bg-brand-charcoal/20"></div>

                <h3 className="font-bold text-xl text-brand-navy font-display mb-1">{job.role}</h3>
                <div className="text-brand-purple font-medium text-sm mb-4 flex items-center gap-2">
                    {job.company}
                    <a href={job.url} target="_blank" rel="noopener noreferrer" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <ExternalLink size={12} />
                    </a>
                </div>

                <div className="md:hidden mb-4 text-xs font-mono text-slate-400 uppercase tracking-widest">
                    {job.date}
                </div>

                <ul className="space-y-3">
                    {job.points.map((point: string, i: number) => (
                        <li
                            key={i}
                            className="flex items-start gap-4 text-brand-charcoal/80 text-sm leading-relaxed font-light"
                        >
                            <div className="w-1.5 h-1.5 bg-brand-gold rounded-full mt-2 flex-shrink-0"></div>
                            <span>{point}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
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
                "Boosted face detection accuracy by 6% via automated ground-truth validation pipelines.",
                "Optimized YOLO-based models for production and engineered face re-identification mechanisms.",
                "Migrated legacy models to updated YOLO architectures based on comparative evaluations."
            ]
        },
        {
            company: "Imentiv AI",
            role: "AI/Machine Learning Intern",
            date: "June 2024 – Sept 2024",
            location: "Cupertino, CA",
            url: "https://www.imentiv.ai",
            points: [
                "Engineered an image deduplication pipeline filtering 95% redundancies to reduce noise.",
                "Built a facial analysis tool using YOLOv8 to detect faces and label emotions."
            ]
        },
        {
            company: "Asterbyte Software Systems",
            role: "Software Engineer Intern",
            date: "June 2023 – Aug 2023",
            location: "Remote",
            url: "#",
            points: [
                "Designed ML solutions for emotion detection on human faces in videos.",
                "Published research on facial emotion recognition at WCSET 2023."
            ]
        }
    ];

    return (
        <section id="experience" className="py-32 bg-white relative">
            <div className="container mx-auto px-6 max-w-5xl relative z-10">
                <div className="mb-20">
                    <h2 className="text-4xl lg:text-5xl font-bold text-brand-navy mb-4 font-display">Experience</h2>
                    <div className="w-full h-px bg-brand-charcoal/10"></div>
                </div>

                <div className="space-y-0">
                    {EXPERIENCE.map((job, index) => (
                        <ExperienceItem key={index} job={job} />
                    ))}
                </div>
            </div>
        </section>
    );
};
