"use client";

import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Skills } from "@/components/Skills";
import { Experience } from "@/components/Experience";
import { ProjectCard } from "@/components/ProjectCard";
import { Publications } from "@/components/Publications";
import { Footer } from "@/components/Footer";

const LINKS = {
  imentiv: "https://www.imentiv.ai",
  behavioralCoach: "https://behavioral-interview-coach.vercel.app/",
  sikhAi: "https://sikhai.vercel.app/",
  github: "https://github.com/rohan1234usa",
  linkedin: "https://linkedin.com/in/rohan123",
  email: "mailto:rohans9@uci.edu",
};

const PROJECTS = [
  {
    title: "Behavioural Interview Coach",
    tech: ["Python", "FastAPI", "Computer Vision", "FFmpeg"],
    desc: "Real-time interview simulation. Features a behavioral analysis engine quantifying Confidence, Clarity, and Resilience using micro-expression analysis.",
    link: LINKS.behavioralCoach,
    image: "/images/behavioral-coach.jpg",
    color: "from-brand-purple to-brand-navy", // Academic Gradient: Purple to Navy
  },
  {
    title: "SikhAI",
    tech: ["RAG", "Next.js", "Vertex AI", "Firebase"],
    desc: "RAG-based chatbot for spiritual guidance. Includes a full-stack community platform and high-performance Shabad search engine.",
    link: LINKS.sikhAi,
    image: "/images/sikh-ai.jpg",
    color: "from-brand-gold to-brand-yellow", // Academic Gradient: Gold to Yellow
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-brand-cream selection:bg-brand-purple selection:text-white">
      <Navbar />
      <Hero />

      <Skills />

      <Experience />

      <section id="projects" className="py-24 bg-brand-blue-light/30 relative">
        {/* Background curve or separator could be added here */}
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="mb-12 text-center">
            <span className="text-brand-purple font-bold tracking-wider uppercase text-sm">Portfolio</span>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mt-2 mb-4 font-display">Featured Projects</h2>
            <div className="w-20 h-1 bg-brand-gold mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {PROJECTS.map((p, i) => (
              <ProjectCard key={i} project={p} />
            ))}
          </div>
        </div>
      </section>

      <Publications />

      <Footer />
    </main>
  );
}