"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "education", label: "Education" },
    { id: "publications", label: "Publications" },
    { id: "contact", label: "Contact" },
];

export const SectionRail = () => {
    const [activeId, setActiveId] = useState<string | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
                if (visible[0]) {
                    setActiveId(visible[0].target.id);
                }
            },
            {
                rootMargin: "-40% 0px -55% 0px",
                threshold: [0, 0.25, 0.5, 0.75, 1],
            }
        );

        const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(
            (el): el is HTMLElement => el !== null
        );
        els.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <nav
            aria-label="Section navigation"
            className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-5"
        >
            {SECTIONS.map((s) => {
                const isActive = activeId === s.id;
                return (
                    <a
                        key={s.id}
                        href={`#${s.id}`}
                        aria-label={`Jump to ${s.label}`}
                        aria-current={isActive ? "true" : undefined}
                        className="group relative flex items-center justify-center w-4 h-4 outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-full"
                    >
                        <span
                            className={`block rounded-full transition-all duration-300 ${isActive
                                ? "w-2.5 h-2.5 bg-accent scale-100"
                                : "w-2 h-2 bg-fg-muted/60 group-hover:bg-accent/70 group-hover:scale-125"
                                }`}
                        />
                        <span
                            className="pointer-events-none absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap text-[10px] font-medium tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity bg-fg text-bg px-2.5 py-1 rounded-sm shadow-sm"
                        >
                            {s.label}
                        </span>
                    </a>
                );
            })}
        </nav>
    );
};
