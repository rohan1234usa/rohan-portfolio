"use client";

import { Code2, BrainCircuit, Database } from "lucide-react";

interface SkillOne {
    title: string;
    icon: any;
    skills: string[];
}

const SkillColumn = ({ title, icon, skills }: SkillOne) => (
    <div className="p-8 bg-white border border-brand-charcoal/10 rounded-sm hover:border-brand-purple/50 transition-colors">
        <div className="flex items-center gap-3 mb-8">
            <div className="text-brand-navy">
                {icon}
            </div>
            <h3 className="font-semibold text-base text-brand-navy font-display">{title}</h3>
        </div>
        <div className="flex flex-wrap gap-x-2 gap-y-3">
            {skills.map((s, i) => (
                <span
                    key={i}
                    className="px-0 py-0 text-brand-charcoal/70 text-sm font-medium hover:text-brand-purple transition-all cursor-default border-b border-transparent hover:border-brand-purple"
                >
                    {s}{i < skills.length - 1 ? "," : ""}
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
        <section className="py-20 bg-brand-cream/30">
            <div className="container mx-auto px-6 max-w-5xl">
                {/* Section Header */}
                <div className="mb-12">
                    <h2 className="text-4xl lg:text-5xl font-bold text-brand-navy mb-4 font-display">Skills</h2>
                    <div className="w-full h-px bg-brand-charcoal/10" />
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
