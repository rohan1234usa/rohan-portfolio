"use client";

export const Footer = () => (
    <footer className="bg-brand-navy py-12 text-center text-brand-blue-light/60 text-sm border-t border-white/10">
        <div className="container mx-auto px-6">
            <p className="mb-4 text-white/90 font-display text-lg">
                Designed with the <span className="text-brand-gold">Academic Gradient</span>
            </p>
            <p>© {new Date().getFullYear()} Rohan Singh. Built with Next.js, Tailwind v4 & Passion.</p>
        </div>
    </footer>
);
