"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image"; // Optimized image handling
import { motion } from "framer-motion";
import { 
  Github, Linkedin, Mail, Code2, BrainCircuit, Database, 
  ExternalLink, BookOpen, ChevronRight 
} from "lucide-react";

// --- PERSONAL DATA & CONFIGURATION ---
const LINKS = {
  imentiv: "https://www.imentiv.ai",
  behavioralCoach: "https://behavioral-interview-coach.vercel.app/",
  sikhAi: "https://sikhai.vercel.app/",
  github: "https://github.com/rohan1234usa",
  linkedin: "https://linkedin.com/in/rohan123",
  email: "mailto:rohans9@uci.edu"
};

const SKILLS = {
  languages: ["Python", "C++", "Java", "Kotlin", "SQL", "MIPS Assembly"],
  ai_cv: ["PyTorch", "YOLOv8", "OpenCV", "RAG", "Gemini Pro", "TensorFlow", "ByteTrack"],
  tools: ["Docker", "AWS", "GCP", "Git", "Next.js", "Firebase", "Vertex AI"]
};

const EXPERIENCE = [
  {
    company: "Imentiv AI",
    role: "AI/Machine Learning Intern",
    date: "June 2025 – Sept 2025",
    location: "Cupertino, CA",
    url: LINKS.imentiv,
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
    url: LINKS.imentiv,
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

const PROJECTS = [
  {
    title: "Behavioural Interview Coach",
    tech: ["Python", "FastAPI", "Computer Vision", "FFmpeg"],
    desc: "Real-time interview simulation. Features a behavioral analysis engine quantifying Confidence, Clarity, and Resilience using micro-expression analysis.",
    link: LINKS.behavioralCoach,
    image: "/images/behavioral-coach.jpg", // Ensure this file exists in public/images
    color: "from-purple-500 to-indigo-600"
  },
  {
    title: "SikhAI",
    tech: ["RAG", "Next.js", "Vertex AI", "Firebase"],
    desc: "RAG-based chatbot for spiritual guidance. Includes a full-stack community platform and high-performance Shabad search engine.",
    link: LINKS.sikhAi,
    image: "/images/sikh-ai.jpg", // Ensure this file exists in public/images
    color: "from-amber-500 to-orange-600"
  }
];

const PUBLICATIONS = [
  {
    title: "Enhancing Face Emotion Recognition with FACS-Based Synthetic Dataset",
    conference: "8th International Conference on Computer Vision & Image Processing",
    date: "Nov 2023",
    link: "#"
  },
  {
    title: "Face Emotion Recognition with New Auto Generated Emotions Dataset: EMOTE-2023",
    conference: "WCSET 2023 & IRAJ",
    date: "Mar 2023",
    link: "#"
  }
];

// --- COMPONENTS ---

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <h1 className={`text-xl font-bold tracking-tight ${scrolled ? 'text-brand-purple' : 'text-slate-800'}`}>
          Rohan<span className="text-brand-accent">.Singh</span>
        </h1>
        <div className="flex gap-4">
          <a href={LINKS.github} target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-slate-100 rounded-full transition-colors"><Github size={20} /></a>
          <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-slate-100 rounded-full transition-colors"><Linkedin size={20} /></a>
        </div>
      </div>
    </nav>
  );
};

const Hero = () => (
  <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
    <div className="absolute top-0 right-0 -z-10 w-[600px] h-[600px] bg-brand-purple/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/4"></div>
    <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
      <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
        <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-brand-purple uppercase bg-brand-purple/10 rounded-full">
          CS @ UC Irvine • GPA 3.9
        </div>
        <h1 className="text-4xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
          Building the Future of <span className="text-brand-purple">Computer Vision</span> & AI.
        </h1>
        <p className="text-lg text-slate-600 mb-8 max-w-lg leading-relaxed">
          I'm Rohan Singh. I bridge the gap between academic research and production code, specializing in RAG pipelines, Generative AI, and YOLO architectures.
        </p>
        <div className="flex flex-wrap gap-4">
          <a href="#projects" className="px-8 py-3 bg-brand-purple text-white font-medium rounded-lg hover:bg-purple-900 transition-colors shadow-lg shadow-brand-purple/20">
            View Work
          </a>
          <a href={LINKS.email} className="px-8 py-3 border border-slate-300 text-slate-700 font-medium rounded-lg hover:border-brand-purple hover:text-brand-purple transition-colors bg-white">
            Contact Me
          </a>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative flex justify-center">
        <div className="relative w-72 h-72 lg:w-[400px] lg:h-[400px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white rotate-3 hover:rotate-0 transition-all duration-500">
          {/* Profile Image - Ensure public/images/profile.png exists */}
          <Image 
            src="/images/profile.png" 
            alt="Rohan Singh" 
            fill 
            className="object-cover"
            priority
          />
        </div>
      </motion.div>
    </div>
  </section>
);

const ProjectCard = ({ project }: { project: any }) => (
  <motion.div whileHover={{ y: -5 }} className="group relative rounded-2xl bg-white border border-slate-100 shadow-lg overflow-hidden flex flex-col h-full">
    {/* Image Section */}
    <div className={`relative h-48 w-full bg-gradient-to-r ${project.color} flex items-center justify-center overflow-hidden`}>
      {/* Fallback gradient if image fails, or overlay */}
      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
      {/* If you have screenshots, uncomment below. If not, the gradient acts as a nice placeholder */}
      {/* <Image src={project.image} alt={project.title} fill className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-500" /> */}
      <h3 className="relative z-10 text-white font-bold text-2xl drop-shadow-md px-4 text-center">{project.title}</h3>
    </div>

    {/* Content Section */}
    <div className="p-6 flex flex-col flex-grow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t: string, i: number) => (
            <span key={i} className="px-2 py-1 bg-slate-50 border border-slate-100 text-[10px] font-bold uppercase tracking-wide text-slate-500 rounded">
              {t}
            </span>
          ))}
        </div>
      </div>
      <p className="text-slate-600 mb-6 text-sm leading-relaxed flex-grow">
        {project.desc}
      </p>
      <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-brand-purple font-semibold text-sm hover:underline mt-auto">
        View Project <ExternalLink size={14} />
      </a>
    </div>
  </motion.div>
);

const ExperienceItem = ({ job }: { job: any }) => (
  <div className="relative pl-8 md:pl-0">
    <div className="md:grid md:grid-cols-[1fr_auto_1fr] md:gap-4 items-start group">
      {/* Date (Left Side on Desktop) */}
      <div className="hidden md:block text-right pr-6 pt-1">
        <span className="text-sm font-mono text-slate-400 group-hover:text-brand-purple transition-colors">{job.date}</span>
      </div>

      {/* Timeline Dot & Line */}
      <div className="hidden md:flex flex-col items-center h-full">
        <div className="w-4 h-4 rounded-full bg-brand-purple border-4 border-white shadow-sm z-10"></div>
        <div className="w-0.5 h-full bg-slate-200 -mt-2 group-last:hidden"></div>
      </div>

      {/* Content Card */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all mb-8 md:mb-0 relative">
        {/* Mobile Dot */}
        <div className="md:hidden absolute -left-[41px] top-6 w-4 h-4 rounded-full bg-brand-purple border-4 border-white shadow-sm"></div>
        <div className="md:hidden absolute -left-[34px] top-10 bottom-[-32px] w-0.5 bg-slate-200"></div>

        <div className="flex justify-between items-center mb-2">
          <h3 className="font-bold text-lg text-slate-800">{job.role}</h3>
          <a href={job.url} target="_blank" rel="noopener noreferrer" className="text-xs text-slate-400 hover:text-brand-purple"><ExternalLink size={14}/></a>
        </div>
        <div className="text-brand-purple font-medium text-sm mb-4">{job.company}</div>
        <ul className="space-y-2">
          {job.points.map((point: string, i: number) => (
            <li key={i} className="flex items-start gap-2 text-slate-600 text-sm leading-relaxed">
              <ChevronRight size={14} className="mt-1 text-brand-accent flex-shrink-0" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

const SkillColumn = ({ title, icon, skills }: { title: string, icon: any, skills: string[] }) => (
  <div className="p-6 bg-brand-bg rounded-xl border border-slate-100">
    <div className="flex items-center gap-3 mb-4">
      {icon} <h3 className="font-bold text-lg">{title}</h3>
    </div>
    <div className="flex flex-wrap gap-2">
      {skills.map((s, i) => <span key={i} className="px-2 py-1 bg-white border border-slate-200 rounded text-sm text-slate-600">{s}</span>)}
    </div>
  </div>
);

export default function Home() {
  return (
    <main className="min-h-screen bg-brand-bg selection:bg-brand-purple selection:text-white">
      <Navbar />
      <Hero />
      
      {/* SKILLS SECTION */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-slate-900">Technical Skills</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <SkillColumn title="Languages" icon={<Code2 className="text-brand-purple"/>} skills={SKILLS.languages} />
            <SkillColumn title="AI & CV" icon={<BrainCircuit className="text-brand-purple"/>} skills={SKILLS.ai_cv} />
            <SkillColumn title="Tools" icon={<Database className="text-brand-purple"/>} skills={SKILLS.tools} />
          </div>
        </div>
      </section>

      {/* EXPERIENCE SECTION */}
      <section id="experience" className="py-20 bg-brand-bg">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Experience</h2>
          <div className="space-y-0">
            {EXPERIENCE.map((job, index) => <ExperienceItem key={index} job={job} />)}
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Featured Projects</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {PROJECTS.map((p, i) => <ProjectCard key={i} project={p} />)}
          </div>
        </div>
      </section>

      {/* RESEARCH SECTION */}
      <section className="py-20 bg-brand-bg">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
            <BookOpen className="text-brand-purple" /> Publications
          </h2>
          <div className="grid gap-4">
            {PUBLICATIONS.map((pub, i) => (
              <div key={i} className="bg-white p-5 rounded-lg border border-slate-200 flex justify-between items-center hover:border-brand-purple transition-colors">
                <div>
                  <h3 className="font-semibold text-slate-800">{pub.title}</h3>
                  <p className="text-sm text-slate-500 mt-1">{pub.conference} • {pub.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-white border-t border-slate-200 py-8 text-center text-slate-500 text-sm">
        <p>© {new Date().getFullYear()} Rohan Singh. Built with Next.js & Tailwind.</p>
      </footer>
    </main>
  );
}