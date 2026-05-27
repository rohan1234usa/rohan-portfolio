"use client";

import { ReactNode } from "react";
import { Code2, BrainCircuit, Database, Wrench } from "lucide-react";
import { TechIcon } from "./TechIcon";

interface SkillOne {
    title: string;
    icon: ReactNode;
    skills: string[];
}

const SkillColumn = ({ title, icon, skills }: SkillOne) => (
    <div className="p-8 bg-white dark:bg-brand-surface border border-brand-charcoal/10 dark:border-brand-cream/10 rounded-sm hover:border-brand-purple/50 dark:hover:border-brand-gold/50 transition-colors">
        <div className="flex items-center gap-3 mb-8">
            <div className="text-brand-navy dark:text-brand-cream">
                {icon}
            </div>
            <h3 className="font-semibold text-base text-brand-navy dark:text-brand-cream font-display">{title}</h3>
        </div>
        <div className="flex flex-wrap gap-2">
            {skills.map((s, i) => (
                <span
                    key={i}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-brand-charcoal/5 dark:bg-brand-cream/10 text-brand-charcoal/80 dark:text-brand-cream/80 text-xs font-medium rounded-sm border border-transparent hover:border-brand-purple/30 dark:hover:border-brand-gold/30 transition-colors cursor-default"
                >
                    <TechIcon name={s} />
                    {s}
                </span>
            ))}
        </div>
    </div>
);

export const Skills = () => {
    const SKILLS = {
        languages: ["Python", "C++", "Java", "Kotlin", "SQL", "TypeScript", "JavaScript", "C#"],
        ai_cv: [
            "PyTorch",
            "YOLOv8",
            "OpenCV",
            "RAG",
            "Gemini Pro",
            "DINOv2",
            "Faiss",
            "ByteTrack",
            "TensorFlow",
        ],
        tools: ["Docker", "AWS", "GCP", "Next.js", "Firebase", "FastAPI", "Vertex AI", "Unreal Engine"],
    };

    return (
        <section id="skills" className="py-20 bg-brand-cream/30 dark:bg-brand-ink">
            <div className="container mx-auto px-6 max-w-5xl">
                {/* Section Header */}
                <div className="mb-12">
                    <h2 className="text-4xl lg:text-5xl font-bold text-brand-navy dark:text-brand-cream mb-4 font-display flex items-center gap-3">
                        <Wrench className="text-brand-purple dark:text-brand-gold" size={32} />
                        Skills
                    </h2>
                    <div className="w-full h-px bg-brand-charcoal/10 dark:bg-brand-cream/10" />
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    <SkillColumn
                        title="Languages"
                        icon={<Code2 size={20} />}
                        skills={SKILLS.languages}
                    />
                    <SkillColumn
                        title="AI & Vision"
                        icon={<BrainCircuit size={20} />}
                        skills={SKILLS.ai_cv}
                    />
                    <SkillColumn
                        title="Engineering"
                        icon={<Database size={20} />}
                        skills={SKILLS.tools}
                    />
                </div>
            </div>
        </section>
    );
};
