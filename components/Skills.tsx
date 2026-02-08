"use client";

import { Code2, BrainCircuit, Database } from "lucide-react";

interface SkillOne {
    title: string;
    icon: any;
    skills: string[];
}

const SkillColumn = ({ title, icon, skills }: SkillOne) => (
    <div className="p-6 bg-brand-cream/50 rounded-xl border border-brand-lavender hover:border-brand-purple/30 transition-colors">
        <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-brand-lavender rounded-lg text-brand-purple">
                {icon}
            </div>
            <h3 className="font-bold text-lg text-brand-navy font-display">{title}</h3>
        </div>
        <div className="flex flex-wrap gap-2">
            {skills.map((s, i) => (
                <span
                    key={i}
                    className="px-3 py-1.5 bg-brand-lavender text-brand-purple border border-brand-lavender/50 rounded-full text-sm font-medium hover:bg-brand-purple hover:text-white transition-all cursor-default"
                >
                    {s}
                </span>
            ))}
        </div>
    </div>
);

export const Skills = () => {
    const SKILLS = {
        languages: ["Python", "C++", "Java", "Kotlin", "SQL", "MIPS Assembly"],
        ai_cv: [
            "PyTorch",
            "YOLOv8",
            "OpenCV",
            "RAG",
            "Gemini Pro",
            "TensorFlow",
            "ByteTrack",
        ],
        tools: ["Docker", "AWS", "GCP", "Git", "Next.js", "Firebase", "Vertex AI"],
    };

    return (
        <section className="py-24 bg-white relative">
            <div className="container mx-auto px-6">
                <div className="mb-12 text-center">
                    <span className="text-brand-purple font-bold tracking-wider uppercase text-sm">Expertise</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mt-2 mb-4">Technical Skills</h2>
                    <div className="w-20 h-1 bg-brand-gold mx-auto rounded-full"></div>
                </div>
                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    <SkillColumn
                        title="Languages"
                        icon={<Code2 size={24} />}
                        skills={SKILLS.languages}
                    />
                    <SkillColumn
                        title="AI & CV"
                        icon={<BrainCircuit size={24} />}
                        skills={SKILLS.ai_cv}
                    />
                    <SkillColumn
                        title="Tools"
                        icon={<Database size={24} />}
                        skills={SKILLS.tools}
                    />
                </div>
            </div>
        </section>
    );
};
