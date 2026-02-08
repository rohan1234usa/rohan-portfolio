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
    <div className="relative pl-8 md:pl-0 group">
        <div className="md:grid md:grid-cols-[1fr_auto_1fr] md:gap-8 items-start">
            {/* Date (Left Side on Desktop) */}
            <div className="hidden md:block text-right pt-2">
                <span className="text-sm font-bold tracking-wide text-brand-charcoal/70 group-hover:text-brand-purple transition-colors">
                    {job.date}
                </span>
            </div>

            {/* Timeline Dot & Line */}
            <div className="hidden md:flex flex-col items-center h-full">
                <div className="w-4 h-4 rounded-full bg-brand-gold border-4 border-white shadow-md z-10 group-hover:scale-125 transition-transform duration-300"></div>
                <div className="w-0.5 h-full bg-brand-lavender/50 -mt-2 group-last:hidden"></div>
            </div>

            {/* Content Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-brand-lavender/30 hover:border-brand-gold hover:shadow-md transition-all mb-8 md:mb-0 relative">
                {/* Mobile Dot */}
                <div className="md:hidden absolute -left-[39px] top-6 w-4 h-4 rounded-full bg-brand-gold border-4 border-white shadow-md z-10"></div>
                <div className="md:hidden absolute -left-[32px] top-10 bottom-[-32px] w-0.5 bg-brand-lavender/50"></div>

                <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-lg text-brand-navy font-display">{job.role}</h3>
                    <a
                        href={job.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand-purple/50 hover:text-brand-purple transition-colors"
                    >
                        <ExternalLink size={16} />
                    </a>
                </div>
                <div className="text-brand-purple font-semibold text-sm mb-4">
                    {job.company}
                </div>
                <div className="md:hidden mb-4 text-xs font-mono text-slate-500">
                    {job.date}
                </div>
                <ul className="space-y-3">
                    {job.points.map((point: string, i: number) => (
                        <li
                            key={i}
                            className="flex items-start gap-3 text-brand-charcoal text-sm leading-relaxed"
                        >
                            <ChevronRight
                                size={16}
                                className="mt-0.5 text-brand-gold flex-shrink-0"
                            />
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
        <section id="experience" className="py-24 bg-brand-cream relative overflow-hidden">
            {/* Bridge Motif: Diagonal Line */}
            <div className="absolute top-0 left-0 w-full h-24 bg-white transform -skew-y-2 origin-top-left z-0"></div>

            <div className="container mx-auto px-6 max-w-4xl relative z-10">
                <div className="mb-16 text-center">
                    <span className="text-brand-purple font-bold tracking-wider uppercase text-sm">Career Journey</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mt-2 mb-4">Experience</h2>
                    <div className="w-20 h-1 bg-brand-gold mx-auto rounded-full"></div>
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
