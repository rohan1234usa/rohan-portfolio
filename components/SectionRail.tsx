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
    // True until the first section reaches the rail. The hero's container widens to each
    // breakpoint (1280, 1536px), which puts its photo card under the dots just past them, so
    // the rail stays out of the hero entirely rather than collide there.
    const [beforeSections, setBeforeSections] = useState(true);

    useEffect(() => {
        const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(
            (el): el is HTMLElement => el !== null
        );
        // Callbacks only report sections whose state changed, so keep the full picture here —
        // otherwise the last-seen section stays lit after scrolling back up into the hero.
        const ratios = new Map<string, number>();
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) ratios.set(e.target.id, e.intersectionRatio);
                    else ratios.delete(e.target.id);
                });
                let best: string | null = null;
                let bestRatio = -1;
                ratios.forEach((ratio, id) => {
                    if (ratio > bestRatio) {
                        best = id;
                        bestRatio = ratio;
                    }
                });
                setActiveId(best);
                // An empty band means the reader is above the first section or past the last;
                // only the first hides the rail. 0.45 is the band's lower edge (the -55% below).
                setBeforeSections(
                    best === null && els.length > 0 && els[0].getBoundingClientRect().top > window.innerHeight * 0.45
                );
            },
            {
                rootMargin: "-40% 0px -55% 0px",
                threshold: [0, 0.25, 0.5, 0.75, 1],
            }
        );

        els.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    // From 1080px only. The sections' text column (max-w-5xl, px-6) ends at 50vw + 488px and
    // the dots start at 100vw − 36px, so narrower than that they overlap it — and from md up
    // the navbar carries every section link but Publications. `invisible`, not just
    // transparent, so the hidden rail also leaves the tab order.
    return (
        <nav
            aria-label="Section navigation"
            className={`fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden min-[1080px]:flex flex-col gap-5 transition-[opacity,visibility] duration-300 motion-reduce:transition-none ${
                beforeSections ? "invisible opacity-0" : "visible opacity-100"
            }`}
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
