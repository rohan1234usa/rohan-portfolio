"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Education } from "@/components/Education";
import { Skills } from "@/components/Skills";
import { Experience } from "@/components/Experience";
import { ProjectCard } from "@/components/ProjectCard";
import { Publications } from "@/components/Publications";
import { Stats } from "@/components/Stats";
import { ContactForm } from "@/components/ContactForm";
import { SectionRail } from "@/components/SectionRail";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup } from "@/components/motion/StaggerGroup";
import { EASE_OUT_QUAD } from "@/components/motion/tokens";
import { FolderGit2, Mail } from "lucide-react";

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
    tech: ["FastAPI", "Python", "Docker", "AWS S3", "Computer Vision"],
    desc: "Soft-skills-first interview simulator that quantifies subconscious cues like eye contact, micro-expressions, and vocal pacing to improve delivery.",
    link: LINKS.behavioralCoach,
    image: "",
    images: [],
    details: [
      "Computer-vision pipeline separates semantic content from delivery, scoring each on its own rubric per question.",
      "FastAPI + Docker backend with AWS S3 storage handles real-time session capture and on-demand replay.",
      "Generates a post-session report with timestamped clips of the strongest and weakest moments.",
    ],
    color: "from-brand-purple to-brand-navy",
  },
  {
    title: "SikhAI",
    tech: ["Next.js", "Firebase", "Vertex AI", "Tailwind", "RAG"],
    desc: "Full-stack spiritual companion: a RAG chatbot grounded in Sikh scripture, Shabad search, daily Hukamnama, and a community event organizer.",
    link: LINKS.sikhAi,
    image: "/images/sikh-ai.jpg",
    images: ["/images/sikh-ai.jpg"],
    details: [
      "RAG chatbot grounded in a curated corpus of Sikh scripture and historical commentary, served via Vertex AI.",
      "Shabad search and daily Hukamnama pulled automatically and rendered alongside transliteration and translation.",
      "Community module lets local sangats post and RSVP to events without a separate account system.",
    ],
    color: "from-brand-gold to-brand-yellow",
  },
  {
    title: "Hue Christmas",
    tech: ["Android SDK", "Kotlin", "Philips Hue API"],
    desc: "Mobile application for Philips Hue smart lights, enabling festive light shows and ambient holiday scenes.",
    link: LINKS.hueChristmas,
    image: "",
    images: [],
    details: [
      "Choreographed multi-bulb light sequences synchronized to a curated playlist of holiday tracks.",
      "Custom scene editor lets users layer color transitions and brightness curves with a timeline UI.",
      "Shipped on the Google Play Store with sustained 4-star+ user ratings.",
    ],
    color: "from-brand-navy to-brand-purple",
  },
  {
    title: "Pitch Prime",
    tech: ["Android SDK", "Java", "Firebase"],
    desc: "Reconstructed and optimized mobile application with enhanced performance and user experience improvements.",
    link: LINKS.pitchPrime,
    image: "",
    images: [],
    details: [
      "Rewrote the UI layer from scratch, cutting cold-start time and removing legacy performance bottlenecks.",
      "Translated the app from Spanish to English to broaden the addressable user base.",
      "Hardened Firebase reads/writes with batched queries and proper offline persistence.",
    ],
    color: "from-brand-charcoal to-brand-navy",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-brand-cream dark:bg-brand-ink selection:bg-brand-purple selection:text-white">
      <Navbar />
      <Hero />

      <Stats />

      <Experience />

      <section id="projects" className="py-32 bg-white dark:bg-brand-ink relative">
        <div className="container mx-auto px-6 max-w-5xl">
          <Reveal className="mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-brand-navy dark:text-brand-cream mb-4 font-display flex items-center gap-3">
              <FolderGit2 className="text-brand-purple dark:text-brand-gold" size={32} />
              Projects
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

          <StaggerGroup className="grid md:grid-cols-2 gap-12" stagger={0.12}>
            {PROJECTS.map((p, i) => (
              <ProjectCard key={i} project={p} />
            ))}
          </StaggerGroup>
        </div>
      </section>

      <Skills />

      <Education />

      <Publications />

      <section id="contact" className="py-20 bg-brand-cream dark:bg-brand-ink">
        <div className="container mx-auto px-6 max-w-3xl">
          <Reveal className="mb-10">
            <h2 className="text-4xl lg:text-5xl font-bold text-brand-navy dark:text-brand-cream mb-4 font-display flex items-center gap-3">
              <Mail className="text-brand-purple dark:text-brand-gold" size={32} />
              Contact
            </h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.7, delay: 0.15, ease: EASE_OUT_QUAD }}
              style={{ transformOrigin: "0% 50%" }}
              className="w-full h-px bg-brand-charcoal/10 dark:bg-brand-cream/10"
            />
            <p className="mt-6 text-brand-charcoal/70 dark:text-brand-cream/70 font-light">
              Open to internships, collaborations, or just trading notes on CV pipelines and RAG systems.
            </p>
          </Reveal>
          <ContactForm />
        </div>
      </section>

      <SectionRail />

      <Footer />
    </main>
  );
}