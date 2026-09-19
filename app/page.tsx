import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Education } from "@/components/Education";
import { Skills } from "@/components/Skills";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Publications } from "@/components/Publications";
import { Stats } from "@/components/Stats";
import { Contact } from "@/components/Contact";
import { SectionRail } from "@/components/SectionRail";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-bg">
      <Navbar />
      <Hero />

      <Stats />

      <Experience />

      <Projects />

      <Skills />

      <Education />

      <Publications />

      <Contact />

      <SectionRail />

      <Footer />
    </main>
  );
}
