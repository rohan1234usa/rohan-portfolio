"use client";

import { Linkedin, Mail } from "lucide-react";

const LINKS = {
    linkedin: "https://linkedin.com/in/rohan123",
    email: "mailto:rohans9@uci.edu",
};

export const Footer = () => (
    <footer className="relative py-16 border-t border-line bg-[image:var(--gradient-hero)]">
        {/* Tonal wash to keep gradient text legible */}
        <div aria-hidden className="absolute inset-0 bg-[#0F0A1E]/55 dark:bg-[#0F0A1E]/40 pointer-events-none" />

        <div className="relative container mx-auto px-6">
            {/* Contact CTA */}
            <div className="text-center mb-12">
                <h3 className="text-2xl font-display text-brand-cream-warm mb-4 tracking-tight">
                    Let&apos;s Build Something Together
                </h3>
                <p className="text-brand-cream-warm/65 mb-8 max-w-md mx-auto">
                    Always open to discussing new opportunities, collaborations, or ideas.
                </p>
                <div className="flex justify-center gap-4 flex-wrap">
                    <a
                        href={LINKS.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-brand-yellow text-brand-navy font-medium rounded-sm hover:bg-brand-cream-warm transition-all duration-300 inline-flex items-center gap-2"
                    >
                        <Linkedin size={18} />
                        Connect on LinkedIn
                    </a>
                    <a
                        href={LINKS.email}
                        className="px-6 py-3 border border-brand-cream-warm/35 text-brand-cream-warm font-medium rounded-sm hover:bg-brand-cream-warm hover:text-brand-navy transition-all duration-300 inline-flex items-center gap-2"
                    >
                        <Mail size={18} />
                        Send Email
                    </a>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="text-center pt-8 border-t border-brand-cream-warm/15">
                <p className="mb-3 text-brand-cream-warm/90 font-display text-lg tracking-tight">
                    Designed with the <span className="text-brand-yellow">Academic Gradient</span>
                </p>
                <p className="text-brand-cream-warm/55 text-sm">
                    © {new Date().getFullYear()} Rohan Singh. Built with Next.js, Tailwind v4 & Passion.
                </p>
            </div>
        </div>
    </footer>
);
