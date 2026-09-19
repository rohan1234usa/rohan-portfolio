"use client";

import { ArrowUp, FileText, Github, Linkedin, Mail } from "lucide-react";
import { scrollToTop } from "./SmoothScrollProvider";
import { LINKS } from "@/lib/links";

const FOOTER_LINKS = [
    { label: "GitHub", href: LINKS.github, Icon: Github, external: true },
    { label: "LinkedIn", href: LINKS.linkedin, Icon: Linkedin, external: true },
    { label: "Email", href: `mailto:${LINKS.email}`, Icon: Mail, external: false },
    { label: "Resume", href: LINKS.resume, Icon: FileText, external: true },
];

export const Footer = () => {
    const backToTop = () => {
        scrollToTop();
        // Move keyboard focus along with the view so the next Tab starts from the top of the page.
        document.querySelector<HTMLElement>('header a[href="/"]')?.focus({ preventScroll: true });
    };

    return (
        <footer className="relative overflow-hidden bg-brand-navy dark:bg-[#0A0616] text-brand-cream-warm">
            {/* Academic Gradient, kept as a hairline */}
            <div aria-hidden className="absolute inset-x-0 top-0 h-[2px] bg-gradient-accent" />
            <div
                aria-hidden
                className="pointer-events-none absolute -top-56 right-[-8rem] h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(37,87,153,0.5),transparent_65%)] dark:bg-[radial-gradient(circle,rgba(91,44,145,0.4),transparent_65%)]"
            />

            <div className="relative container mx-auto px-6 max-w-5xl pt-16 pb-10">
                <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
                    <div>
                        <div className="font-display text-3xl font-bold tracking-tight">
                            Rohan <span className="text-brand-yellow">Singh</span>
                        </div>
                        <div className="mt-3 font-mono text-[11px] tracking-[0.18em] uppercase text-brand-cream-warm/55">
                            Software · Machine Learning <span className="whitespace-nowrap">— UC Irvine ’27</span>
                        </div>
                    </div>

                    <ul className="grid grid-cols-2 gap-x-7 gap-y-3 sm:flex sm:flex-wrap text-sm">
                        {FOOTER_LINKS.map(({ label, href, Icon, external }) => (
                            <li key={label}>
                                <a
                                    href={href}
                                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                                    className="inline-flex items-center gap-2 text-brand-cream-warm/80 hover:text-brand-yellow rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow/70"
                                >
                                    <Icon aria-hidden size={15} />
                                    {label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="mt-12 pt-6 border-t border-white/10 flex items-center justify-between gap-4 text-xs text-brand-cream-warm/50">
                    {/* Prerendered at build time — the client may be in a later year */}
                    <span suppressHydrationWarning>© {new Date().getFullYear()} Rohan Singh</span>
                    <button
                        type="button"
                        onClick={backToTop}
                        className="group inline-flex items-center gap-1.5 hover:text-brand-yellow rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow/70"
                    >
                        Back to top
                        <ArrowUp aria-hidden size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
                    </button>
                </div>
            </div>
        </footer>
    );
};
