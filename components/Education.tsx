"use client";

import { ReactNode, useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Award, BookOpen, BadgeCheck, ChevronDown, GraduationCap } from "lucide-react";
import { Reveal } from "./motion/Reveal";
import { StaggerGroup, StaggerItem } from "./motion/StaggerGroup";
import { DURATION, EASE_OUT_QUAD, STAGGER, VIEWPORT } from "./motion/tokens";
import { useReducedMotionSafe } from "./motion/useReducedMotionSafe";

const COURSES = [
    { code: "CS 171", name: "Artificial Intelligence" },
    { code: "CS 178", name: "Machine/Data Mining" },
    { code: "CS 177", name: "Probability in CS" },
    { code: "CS 121", name: "Information Retrieval" },
    { code: "CS 161", name: "Algorithm Design & Analysis" },
    { code: "CS 122A", name: "Data Management" },
    { code: "CS 143A", name: "Operating Systems" },
    { code: "ICS 46", name: "Data Structures & Analysis" },
    { code: "ICS 45C", name: "Programming in C/C++" },
    { code: "INF 43", name: "Software Engineering" },
    { code: "STATS 67", name: "Probability & Statistics" },
    { code: "MATH 3A", name: "Linear Algebra" },
];

interface ApCourse {
    name: string;
    score: 1 | 2 | 3 | 4 | 5;
}

interface ApGroup {
    subject: string;
    courses: ApCourse[];
}

// Grouped the way the LinkedIn profile groups them, so the two stay in step. Names drop
// the "AP " prefix: the bar label already says it.
const AP_GROUPS: ApGroup[] = [
    {
        subject: "Computer Science & Math",
        courses: [
            { name: "Computer Science A", score: 5 },
            { name: "Calculus BC", score: 5 },
            { name: "Calculus AB", score: 5 },
            { name: "Statistics", score: 4 },
        ],
    },
    {
        subject: "Science",
        courses: [
            { name: "Physics 1", score: 5 },
            { name: "Environmental Science", score: 5 },
            { name: "Physics C: Mechanics", score: 4 },
            { name: "Chemistry", score: 4 },
            { name: "Psychology", score: 4 },
        ],
    },
    {
        subject: "Humanities & Language",
        courses: [
            { name: "English Language", score: 4 },
            { name: "French Language", score: 4 },
            { name: "U.S. Government & Politics", score: 4 },
            { name: "Macroeconomics", score: 3 },
        ],
    },
];

// The bars derive their count and teaser from the arrays above, so neither can drift from its panel.
const COURSE_TEASER = COURSES.map((course) => course.name).join(" · ");
const AP_COUNT = AP_GROUPS.reduce((n, group) => n + group.courses.length, 0);
const AP_TEASER = AP_GROUPS.map((group) => group.subject).join(" · ");

/** Badge tint by score. The digit stays on fg / fg-soft: accent-warm text is ~2:1 on white. */
const scoreBadge = (score: ApCourse["score"]) =>
    score === 5
        ? "bg-accent-warm/15 border-accent-warm/40 text-fg"
        : score === 4
            ? "bg-bg-subtle border-line text-fg"
            : "border-line text-fg-soft";

interface SchoolCardProps {
    school: string;
    degree: string;
    meta: string;
    /** Right-hand column of the header. Omit when a school has nothing to summarise there. */
    pills?: ReactNode;
    /** Bar label, rendered as "LABEL · count". Never changes, so nothing shifts on toggle. */
    label: string;
    count: number;
    /** One-line preview beside the label while collapsed. Decorative: hidden from AT and on phones. */
    teaser: string;
    children: ReactNode;
}

/** One school: the header every card shares, then a full-width bar that opens a panel beneath it.
 *  Each card owns its `open`, so both can be open at once and neither closes the other. */
const SchoolCard = ({ school, degree, meta, pills, label, count, teaser, children }: SchoolCardProps) => {
    const [open, setOpen] = useState(false);
    const panelId = useId();
    const reduce = useReducedMotionSafe();

    return (
        <StaggerItem className="border border-line bg-surface">
            <div className="p-8 md:p-10 flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                {/* From lg the left column keeps its natural lines and the pills wrap instead, which is
                    also what brings the collapsed UCI card level with Monta Vista's. Not from md: at 768px
                    with classic scrollbars the pills column would be narrower than the widest pill. */}
                <div className="lg:shrink-0">
                    <p className="text-xs font-medium tracking-widest text-accent uppercase mb-2">{school}</p>
                    <h3 className="text-2xl font-bold text-fg font-display mb-1">{degree}</h3>
                    <p className="text-sm text-fg-muted font-light">{meta}</p>
                </div>
                {pills && <div className="flex flex-wrap gap-3 md:text-right items-start">{pills}</div>}
            </div>

            {/* cursor-pointer: v4 preflight leaves buttons on cursor: default. outline-hidden, not -none:
                it keeps a transparent outline that forced-colors mode renders where the ring can't show.
                The transition classes sit on the icon and teaser, not the button — the unlayered
                `a, button { transition: all }` rule in globals.css wins on the button itself. */}
            <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
                aria-controls={open ? panelId : undefined}
                className="group w-full flex items-center gap-2 sm:gap-3 px-8 md:px-10 py-4 border-t border-line text-left cursor-pointer hover:bg-accent/5 outline-hidden focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
            >
                <BookOpen aria-hidden size={16} className="text-accent shrink-0" />
                {/* Not shrink-0: at 320px the label wraps to two lines instead of pushing the chevron out of the
                    card. gap-2 on phones is what keeps "RELEVANT COURSEWORK · 12" on one line at 360 and 375. */}
                <span className="text-xs font-medium tracking-widest uppercase text-fg-soft group-hover:text-accent transition-colors">
                    {label} · {count}
                </span>
                {/* invisible as well as opacity-0 while open: find-in-page and select-all skip visibility:hidden,
                    but not transparent text, and the same names are right there in the panel. */}
                <span
                    aria-hidden
                    className={`hidden sm:block min-w-0 flex-1 truncate text-sm text-fg-muted font-light transition-[opacity,visibility] duration-300 motion-reduce:transition-none ${open ? "opacity-0 invisible" : "opacity-100"}`}
                >
                    {teaser}
                </span>
                <ChevronDown
                    aria-hidden
                    size={16}
                    className={`ml-auto shrink-0 text-fg-muted group-hover:text-accent transition-all duration-300 motion-reduce:transition-none ${open ? "rotate-180" : ""}`}
                />
            </button>

            <AnimatePresence initial={false}>
                {open && (
                    // Bare: padding lives on the inner div, or framer measures the auto height short and it jumps.
                    // No opacity on the way in: the items inside fade themselves, and fading the panel too would
                    // double-attenuate them. Contents are client-only; the teaser is what the server HTML carries.
                    <motion.div
                        id={panelId}
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: reduce ? 0 : DURATION.short, ease: EASE_OUT_QUAD }}
                        className="overflow-hidden"
                    >
                        <div className="px-8 md:px-10 pb-8 md:pb-10 pt-2">{children}</div>
                    </motion.div>
                )}
            </AnimatePresence>
        </StaggerItem>
    );
};

export const Education = () => (
    <section id="education" className="py-16 bg-bg relative">
        <div className="container mx-auto px-6 max-w-5xl">

            {/* Section header */}
            <Reveal className="mb-12">
                <h2 className="text-4xl lg:text-5xl font-bold text-fg mb-4 font-display flex items-center gap-3">
                    <GraduationCap className="text-accent" size={32} />
                    Education
                </h2>
                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={VIEWPORT}
                    transition={{ duration: 0.7, delay: 0.15, ease: EASE_OUT_QUAD }}
                    style={{ transformOrigin: "0% 50%" }}
                    className="w-full h-px bg-line"
                />
            </Reveal>

            <StaggerGroup stagger={0.15} className="space-y-6">
                <SchoolCard
                    school="University of California, Irvine"
                    degree="B.S. Computer Science"
                    meta="Sept 2024 – Jun 2027 (expected) · Class of 2027"
                    pills={
                        <>
                            {/* GPA pill */}
                            <div className="inline-flex items-center gap-2 px-4 py-2 border border-line text-sm font-medium text-fg-soft self-start md:self-auto">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent-warm flex-shrink-0" />
                                GPA 3.92
                            </div>

                            {/* Dean's Honor List pill */}
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-bg-subtle border border-line text-sm font-medium text-fg self-start md:self-auto">
                                <Award size={14} className="text-accent-warm flex-shrink-0" />
                                Dean&apos;s Honor List — All Quarters
                            </div>

                            {/* Certification pill */}
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-bg-subtle border border-line text-sm font-medium text-fg self-start md:self-auto">
                                <BadgeCheck size={14} className="text-accent-warm flex-shrink-0" />
                                Google Cloud Generative AI Leader
                            </div>
                        </>
                    }
                    label="Relevant Coursework"
                    count={COURSES.length}
                    teaser={COURSE_TEASER}
                >
                    {/* Mounts on click, so it animates on its own rather than waiting for the viewport guard */}
                    <StaggerGroup immediate className="flex flex-wrap gap-3" stagger={STAGGER.chips}>
                        {COURSES.map((course) => (
                            // transition-colors, not -all: a CSS transition on transform would fight framer's
                            // per-frame y writes, so the chip would fade in sitting low and catch up afterwards.
                            <StaggerItem
                                key={course.code}
                                y={8}
                                duration={DURATION.short}
                                className="group flex items-center gap-2 px-4 py-2 border border-line bg-surface hover:border-accent/40 hover:bg-accent/5 transition-colors duration-300 cursor-default"
                            >
                                {/* nowrap: inside the card the chips are 64px narrower, so only the name may wrap */}
                                <span className="whitespace-nowrap text-xs font-bold text-accent/80 group-hover:text-accent transition-colors">
                                    {course.code}
                                </span>
                                <span className="text-sm text-fg-soft font-light">
                                    {course.name}
                                </span>
                            </StaggerItem>
                        ))}
                    </StaggerGroup>
                </SchoolCard>

                <SchoolCard
                    school="Monta Vista High School"
                    degree="High School Diploma"
                    meta="2020 – 2024 · Cupertino, CA"
                    label="AP Coursework"
                    count={AP_COUNT}
                    teaser={AP_TEASER}
                >
                    <StaggerGroup immediate stagger={0.06}>
                        {/* Two columns from sm: three at md leaves ~192px each, which wraps the longest names */}
                        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {AP_GROUPS.map((group) => (
                                <StaggerItem key={group.subject} y={8} duration={DURATION.short}>
                                    {/* Global h1–h6 rules are unlayered, so style the inner span rather than the heading */}
                                    <h4 className="mb-2">
                                        {/* fg-soft, not fg-muted (3.0:1 on white): this is what tells the columns apart */}
                                        <span className="text-xs font-medium tracking-widest uppercase text-fg-soft">
                                            {group.subject}
                                        </span>
                                    </h4>
                                    {/* role="list": Safari drops the list semantics of a list preflight has unstyled */}
                                    <ul role="list">
                                        {group.courses.map((course) => (
                                            <li
                                                key={course.name}
                                                className="flex items-center justify-between gap-3 py-2 border-b border-line last:border-0"
                                            >
                                                <span className="text-sm text-fg-soft font-light">{course.name}</span>
                                                <span
                                                    className={`inline-flex items-center justify-center w-7 h-7 shrink-0 rounded-sm border font-mono text-xs tabular-nums ${scoreBadge(course.score)}`}
                                                >
                                                    {course.score}
                                                    <span className="sr-only"> of 5</span>
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </StaggerItem>
                            ))}
                        </div>
                        {/* A div, not a p: the global p/li line-height rule is unlayered and would win. */}
                        <StaggerItem y={8} duration={DURATION.short} className="mt-6 text-xs text-fg-soft">
                            AP exam scores; 5 is the highest.
                        </StaggerItem>
                    </StaggerGroup>
                </SchoolCard>
            </StaggerGroup>

        </div>
    </section>
);
