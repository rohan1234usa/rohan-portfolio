"use client";

import React, { useState, useEffect } from "react";
import { Github, Linkedin } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { ScrollProgress } from "./ScrollProgress";

const LINKS = {
    github: "https://github.com/rohan1234usa",
    linkedin: "https://linkedin.com/in/rohan123",
};

export const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled
                ? "bg-white/90 dark:bg-brand-ink/90 backdrop-blur-md shadow-sm py-3"
                : "bg-transparent py-5"
                }`}
        >
            <div className="container mx-auto px-6 flex justify-between items-center">
                <Link href="/" className="group">
                    <h1
                        className={`text-xl font-bold tracking-tight transition-colors ${scrolled
                            ? "text-brand-navy dark:text-brand-cream"
                            : "text-brand-charcoal/80 dark:text-brand-cream/80"
                            }`}
                    >
                        Rohan{" "}
                        <span className="text-brand-gold group-hover:text-brand-yellow transition-colors">
                            Singh
                        </span>
                    </h1>
                </Link>

                <div className="flex gap-4 items-center">
                    <div className="hidden md:flex gap-6 mr-2 text-sm font-medium text-brand-charcoal/70 dark:text-brand-cream/70">
                        <a href="#experience" className="hover:text-brand-purple dark:hover:text-brand-gold transition-colors">
                            Experience
                        </a>
                        <a href="#projects" className="hover:text-brand-purple dark:hover:text-brand-gold transition-colors">
                            Projects
                        </a>
                        <a href="#skills" className="hover:text-brand-purple dark:hover:text-brand-gold transition-colors">
                            Skills
                        </a>
                        <a href="#education" className="hover:text-brand-purple dark:hover:text-brand-gold transition-colors">
                            Education
                        </a>
                        <a href="#contact" className="hover:text-brand-purple dark:hover:text-brand-gold transition-colors">
                            Contact
                        </a>
                    </div>
                    <ThemeToggle />
                    <a
                        href={LINKS.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-brand-charcoal/70 dark:text-brand-cream/70 hover:text-brand-navy dark:hover:text-brand-cream border border-transparent hover:border-brand-charcoal/20 dark:hover:border-brand-cream/20 rounded-sm transition-all duration-300"
                    >
                        <Github size={20} />
                    </a>
                    <a
                        href={LINKS.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-brand-charcoal/70 dark:text-brand-cream/70 hover:text-brand-navy dark:hover:text-brand-cream border border-transparent hover:border-brand-charcoal/20 dark:hover:border-brand-cream/20 rounded-sm transition-all duration-300"
                    >
                        <Linkedin size={20} />
                    </a>
                </div>
            </div>
            <ScrollProgress />
        </nav>
    );
};
