"use client";

import { ReactNode } from "react";
import { Code2, BrainCircuit, Database, Wrench } from "lucide-react";
import { motion } from "framer-motion";
import { TechIcon } from "./TechIcon";
import { Reveal } from "./motion/Reveal";
import { StaggerGroup, StaggerItem } from "./motion/StaggerGroup";
import { EASE_OUT_QUAD } from "./motion/tokens";

interface SkillOne {
    title: string;
    icon: ReactNode;
    skills: string[];
}

const SkillColumn = ({ title, icon, skills }: SkillOne) => (
    <StaggerItem className="p-8 bg-white dark:bg-brand-surface border border-brand-charcoal/10 dark:border-brand-cream/10 rounded-sm hover:border-brand-purple/50 dark:hover:border-brand-gold/50 transition-colors">
        <div className="flex items-center gap-3 mb-8">
            <div className="text-brand-navy dark:text-brand-cream">
                {icon}
            </div>
            <h3 className="font-semibold text-base text-brand-navy dark:text-brand-cream font-display">{title}</h3>
        </div>
        <StaggerGroup className="flex flex-wrap gap-2" stagger={0.035}>
            {skills.map((s, i) => (
                <motion.span
                    key={i}
                    variants={{
                        hidden: { opacity: 0, y: 8 },
                        show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE_OUT_QUAD } },
                    }}
                    whileHover={{ scale: 1.04 }}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-brand-charcoal/5 dark:bg-brand-cream/10 text-brand-charcoal/80 dark:text-brand-cream/80 text-xs font-medium rounded-sm border border-transparent hover:border-brand-purple/30 dark:hover:border-brand-gold/30 transition-colors cursor-default"
                >
                    <TechIcon name={s} />
                    {s}
                </motion.span>
            ))}
        </StaggerGroup>
    </StaggerItem>
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
                <Reveal className="mb-12">
                    <h2 className="text-4xl lg:text-5xl font-bold text-brand-navy dark:text-brand-cream mb-4 font-display flex items-center gap-3">
                        <Wrench className="text-brand-purple dark:text-brand-gold" size={32} />
                        Skills
                    </h2>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true, margin: "-10% 0px" }}
                        transition={{ duration: 0.7, delay: 0.15, ease: EASE_OUT_QUAD }}
                        style={{ transformOrigin: "0% 50%" }}
                        className="w-full h-px bg-brand-charcoal/10 dark:bg-brand-cream/10"
                    />
                </Reveal>
                <StaggerGroup className="grid md:grid-cols-3 gap-8" stagger={0.12}>
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
                </StaggerGroup>
            </div>
        </section>
    );
};
