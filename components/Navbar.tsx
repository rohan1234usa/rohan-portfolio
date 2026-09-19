"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotionSafe } from "./motion/useReducedMotionSafe";
import { FileText, Github, Linkedin, Mail, Menu, X } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { ScrollProgress } from "./ScrollProgress";
import { AvailabilityBadge } from "./Availability";
import { lockScroll, unlockScroll } from "./SmoothScrollProvider";
import { EASE_OUT_QUAD } from "./motion/tokens";
import { LINKS } from "@/lib/links";

const SECTIONS = [
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "education", label: "Education" },
    { id: "contact", label: "Contact" },
];

const QUICK_LINKS = [
    { label: "Resume", href: LINKS.resume, Icon: FileText, external: true },
    { label: "GitHub", href: LINKS.github, Icon: Github, external: true },
    { label: "LinkedIn", href: LINKS.linkedin, Icon: Linkedin, external: true },
    { label: "Email", href: `mailto:${LINKS.email}`, Icon: Mail, external: false },
];

const iconLink =
    "p-2 text-fg-soft hover:text-fg border border-transparent hover:border-line-strong rounded-sm transition-all duration-300";

export const Navbar = () => {
    const reduce = useReducedMotionSafe();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const headerRef = useRef<HTMLElement>(null);
    const toggleRef = useRef<HTMLButtonElement>(null);
    const firstLinkRef = useRef<HTMLAnchorElement>(null);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        // Sync once on mount — a reload restores the scroll position without firing a scroll event.
        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // The menu covers the page, so everything outside the header goes inert (focus and screen
    // readers stay in the menu) and scrolling freezes. Applied synchronously rather than in an
    // effect so a section link's own jump happens after the page is interactive again.
    const setMenu = useCallback(
        (open: boolean) => {
            setMenuOpen(open);
            const header = headerRef.current;
            Array.from(header?.parentElement?.children ?? [])
                .filter((el) => el !== header)
                .forEach((el) => el.toggleAttribute("inert", open));
            if (open) lockScroll();
            else unlockScroll();
        },
        [],
    );

    useEffect(() => {
        if (!menuOpen) return;
        firstLinkRef.current?.focus({ preventScroll: true });
        const onKey = (e: KeyboardEvent) => {
            if (e.key !== "Escape") return;
            setMenu(false);
            toggleRef.current?.focus();
        };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [menuOpen, setMenu]);

    // Widening past the breakpoint hides the menu via CSS; close it too so the page unlocks.
    useEffect(() => {
        const desktop = window.matchMedia("(min-width: 768px)");
        const onChange = () => desktop.matches && setMenu(false);
        desktop.addEventListener("change", onChange);
        return () => {
            desktop.removeEventListener("change", onChange);
            setMenu(false);
        };
    }, [setMenu]);

    return (
        <header ref={headerRef}>
            <nav
                aria-label="Primary"
                className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled
                    ? "bg-bg/85 backdrop-blur-md shadow-sm py-3 border-b border-line"
                    : "bg-transparent py-5"
                    }`}
            >
                <div className="container mx-auto px-6 flex justify-between items-center">
                    <Link href="/" className="group" onClick={() => menuOpen && setMenu(false)}>
                        <span
                            className={`font-display text-xl font-bold tracking-tight transition-colors ${scrolled ? "text-fg" : "text-fg-soft"}`}
                        >
                            Rohan{" "}
                            <span className="text-accent-warm group-hover:text-accent transition-colors">
                                Singh
                            </span>
                        </span>
                    </Link>

                    <div className="flex gap-2 md:gap-4 items-center">
                        <div className="hidden md:flex gap-6 mr-2 text-sm font-medium text-fg-soft">
                            {SECTIONS.map((s) => (
                                <a key={s.id} href={`#${s.id}`} className="hover:text-accent transition-colors">
                                    {s.label}
                                </a>
                            ))}
                        </div>
                        <ThemeToggle />
                        <a
                            href={LINKS.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub"
                            className={`hidden md:inline-flex ${iconLink}`}
                        >
                            <Github size={20} />
                        </a>
                        <a
                            href={LINKS.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                            className={`hidden md:inline-flex ${iconLink}`}
                        >
                            <Linkedin size={20} />
                        </a>
                        <button
                            ref={toggleRef}
                            type="button"
                            onClick={() => setMenu(!menuOpen)}
                            aria-expanded={menuOpen}
                            aria-controls={menuOpen ? "mobile-menu" : undefined}
                            aria-label={menuOpen ? "Close menu" : "Open menu"}
                            className={`md:hidden ${iconLink}`}
                        >
                            {menuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>
                <ScrollProgress />
            </nav>

            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        id="mobile-menu"
                        data-lenis-prevent
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: reduce ? 0 : 0.25, ease: EASE_OUT_QUAD }}
                        className="md:hidden fixed inset-0 z-40 bg-bg overflow-y-auto overscroll-contain"
                    >
                        <div className="min-h-full flex flex-col px-6 pt-24 pb-10">
                            <nav aria-label="Sections">
                                <motion.ul
                                    initial="hidden"
                                    animate="show"
                                    variants={{
                                        show: { transition: { staggerChildren: reduce ? 0 : 0.05, delayChildren: reduce ? 0 : 0.05 } },
                                    }}
                                >
                                    {SECTIONS.map((s, i) => (
                                        <motion.li
                                            key={s.id}
                                            variants={{
                                                hidden: { opacity: 0, y: reduce ? 0 : 14 },
                                                show: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.4, ease: EASE_OUT_QUAD } },
                                            }}
                                        >
                                            <a
                                                ref={i === 0 ? firstLinkRef : undefined}
                                                href={`#${s.id}`}
                                                onClick={() => setMenu(false)}
                                                className="group flex items-baseline gap-4 py-4 border-b border-line outline-none focus-visible:text-accent"
                                            >
                                                <span className="font-mono text-xs text-accent">
                                                    {String(i + 1).padStart(2, "0")}
                                                </span>
                                                <span className="font-display text-3xl font-bold text-fg group-hover:text-accent group-focus-visible:text-accent transition-colors">
                                                    {s.label}
                                                </span>
                                            </a>
                                        </motion.li>
                                    ))}
                                </motion.ul>
                            </nav>

                            <div className="mt-auto pt-12">
                                <AvailabilityBadge className="mb-5" />
                                <ul className="grid grid-cols-2 gap-2">
                                    {QUICK_LINKS.map(({ label, href, Icon, external }) => (
                                        <li key={label}>
                                            <a
                                                href={href}
                                                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                                                className="flex items-center justify-center gap-2 px-3.5 py-2.5 text-sm font-medium text-fg-soft border border-line rounded-sm hover:text-accent hover:border-accent/50"
                                            >
                                                <Icon aria-hidden size={15} />
                                                {label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};
