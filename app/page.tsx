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
  pitchPrime: "https://play.google.com/store/apps/details?id=com.sursadhak.pitchprime&hl=en_US",
  hueChristmas: "https://play.google.com/store/apps/details?id=com.asterbyte.huelightshow&hl=en",
  github: "https://github.com/rohan1234usa",
  linkedin: "https://linkedin.com/in/rohan123",
  email: "mailto:rohans9@uci.edu",
};

const PROJECTS = [
  {
    title: "Behavioural Interview Coach",
    tech: ["FastAPI", "Python", "Computer Vision", "FFmpeg"],
    desc: "Real-time interview simulator that quantifies subconscious cues like eye contact, micro-expressions, and vocal pacing to improve delivery.",
    link: LINKS.behavioralCoach,
    image: "/images/behavioral-coach.jpg",
    color: "from-brand-purple to-brand-navy",
  },
  {
    title: "SikhAI",
    tech: ["Next.js", "Firebase", "Vertex AI", "RAG"],
    desc: "AI-powered spiritual companion featuring a context-aware RAG chatbot, daily Hukamnama integration, and a community event organizer.",
    link: LINKS.sikhAi,
    image: "/images/sikh-ai.jpg",
    color: "from-brand-gold to-brand-yellow",
  },
  {
    title: "Hue Christmas",
    tech: ["Android SDK", "Kotlin", "Philips Hue API"],
    desc: "Mobile application for Philips Hue smart lights, enabling festive light shows and ambient holiday scenes.",
    link: LINKS.hueChristmas,
    image: "/images/placeholder-hue.jpg",
    color: "from-brand-navy to-brand-purple",
  },
  {
    title: "Pitch Prime",
    tech: ["Android SDK", "Java", "Firebase"],
    desc: "Reconstructed and optimized mobile application with enhanced performance and user experience improvements.",
    link: LINKS.pitchPrime,
    image: "/images/placeholder-pitch.jpg",
    color: "from-brand-charcoal to-brand-navy",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-brand-cream selection:bg-brand-purple selection:text-white">
      <Navbar />
      <Hero />

      <Skills />

      <Experience />

      <section id="projects" className="py-32 bg-white relative">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-brand-navy mb-4 font-display">Projects</h2>
            <div className="w-full h-px bg-brand-charcoal/10"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
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