"use client";

import React, { useState, useEffect } from "react";
import { Github, Linkedin } from "lucide-react";
import Link from "next/link";

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
                ? "bg-white/90 backdrop-blur-md shadow-sm py-3"
                : "bg-transparent py-5"
                }`}
        >
            <div className="container mx-auto px-6 flex justify-between items-center">
                <Link href="/" className="group">
                    <h1
                        className={`text-xl font-bold tracking-tight transition-colors ${scrolled ? "text-brand-navy" : "text-brand-navy"
                            }`}
                    >
                        Rohan{" "}
                        <span className="text-brand-gold group-hover:text-brand-yellow transition-colors">
                            Singh
                        </span>
                    </h1>
                </Link>

                <div className="flex gap-4 items-center">
                    {/* Navigation Links can go here if needed, for now keeping it simple as per original */}
                    <a
                        href={LINKS.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-brand-charcoal hover:text-brand-purple hover:bg-brand-lavender/20 rounded-full transition-all"
                    >
                        <Github size={20} />
                    </a>
                    <a
                        href={LINKS.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-brand-charcoal hover:text-brand-purple hover:bg-brand-lavender/20 rounded-full transition-all"
                    >
                        <Linkedin size={20} />
                    </a>
                </div>
            </div>
        </nav>
    );
};
