"use client";

import { Linkedin, Mail } from "lucide-react";

const LINKS = {
    linkedin: "https://linkedin.com/in/rohan123",
    email: "mailto:rohans9@uci.edu",
};

export const Footer = () => (
    <footer className="bg-brand-navy py-16 border-t border-white/10">
        <div className="container mx-auto px-6">
            {/* Contact CTA */}
            <div className="text-center mb-12">
                <h3 className="text-2xl font-display text-white mb-4 tracking-tight">
                    Let's Build Something Together
                </h3>
                <p className="text-brand-blue-light/60 mb-8 max-w-md mx-auto">
                    Always open to discussing new opportunities, collaborations, or ideas.
                </p>
                <div className="flex justify-center gap-4 flex-wrap">
                    <a
                        href={LINKS.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-brand-purple text-white font-medium rounded-sm hover:bg-white hover:text-brand-navy transition-all duration-300 inline-flex items-center gap-2"
                    >
                        <Linkedin size={18} />
                        Connect on LinkedIn
                    </a>
                    <a
                        href={LINKS.email}
                        className="px-6 py-3 border border-white/30 text-white font-medium rounded-sm hover:bg-white hover:text-brand-navy transition-all duration-300 inline-flex items-center gap-2"
                    >
                        <Mail size={18} />
                        Send Email
                    </a>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="text-center pt-8 border-t border-white/10">
                <p className="mb-3 text-white/90 font-display text-lg tracking-tight">
                    Designed with the <span className="text-brand-gold">Academic Gradient</span>
                </p>
                <p className="text-brand-blue-light/50 text-sm">
                    © {new Date().getFullYear()} Rohan Singh. Built with Next.js, Tailwind v4 & Passion.
                </p>
            </div>
        </div>
    </footer>
);
