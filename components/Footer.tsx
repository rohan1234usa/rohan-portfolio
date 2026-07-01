"use client";

export const Footer = () => (
    <footer className="relative py-10 border-t border-line bg-[image:var(--gradient-hero)]">
        {/* Tonal wash to keep gradient text legible */}
        <div aria-hidden className="absolute inset-0 bg-[#0F0A1E]/55 dark:bg-[#0F0A1E]/40 pointer-events-none" />

        <div className="relative container mx-auto px-6">
            {/* Colophon */}
            <div className="text-center">
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
