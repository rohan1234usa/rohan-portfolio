"use client";

import { Fragment, type ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Microscope } from "lucide-react";
import { PingDot } from "./PingDot";
import { Reveal } from "./motion/Reveal";
import { StaggerGroup, StaggerItem } from "./motion/StaggerGroup";
import { EASE_OUT_QUAD, VIEWPORT } from "./motion/tokens";

/** Research still under way, shown above the papers under a "Current" label. While a lab's work is
 *  unpublished, the card names the field and Rohan's role only, never the project or its research
 *  question, and takes on specifics only once the lab clears them. When the work becomes a paper or
 *  a poster, give it a PUBLICATIONS entry. */
interface CurrentResearch {
    /** The field, not the project. */
    area: string;
    /** Rohan's role and advisor, in the slot where a paper card lists its authors. */
    byline: string;
    place: string;
    date: string;
    note?: string;
    link: string;
}

interface Publication {
    title: string;
    /** In Rohan's own wording from his résumé, author strings included. */
    authors: string[];
    conference: string;
    date: string;
    /** A later home for the same paper, shown under the conference line. */
    note?: string;
    link: string;
}

/** How Rohan's name appears in the author lists, so it can be set in bold. */
const SELF = new Set(["Rohan Singh", "Rohan S."]);

// Same limit as the lab's entry in components/Experience.tsx: from Rohan's LinkedIn and his own
// account of the work, role and field only, until the PhD students OK more.
const CURRENT: CurrentResearch[] = [
    {
        area: "Computer Vision & Computational Geometry",
        byline: "Undergraduate researcher, advised by Prof. Gopi Meenakshisundaram",
        place: "UC Irvine · Donald Bren School of ICS",
        date: "Sept 2026 – Present",
        note: "Building research tools with the lab’s PhD students; project details stay within the lab for now.",
        link: "https://www.ics.uci.edu/~gopi",
    },
];

const PUBLICATIONS: Publication[] = [
    {
        title: "Enhancing Face Emotion Recognition with FACS-Based Synthetic Dataset Using Deep Learning Models",
        authors: ["Shiwangi M", "Shalu P", "Rohan Singh"],
        conference: "8th International Conference on Computer Vision & Image Processing",
        date: "Nov 2023",
        link: "https://iitjammu.ac.in/cvip2023/index.html",
    },
    {
        title: "Face Emotion Recognition with New Auto Generated Emotions Dataset: EMOTE-2023",
        authors: ["Shalu P", "Insha L", "Rohan S.", "Shiwangi M."],
        conference: "World Conference on Science Engineering and Technology (WCSET)",
        date: "Mar 2023",
        note: "Subsequently published in Institute of Research and Journals (IRAJ)",
        link: "https://digitalxplore.org/proceeding.php?pid=1914",
    },
];

/** A mono label over a hairline, as Projects sets "Now building" and "Also shipped". `live` adds the
 *  ping that marks work in progress. Global h1–h6 rules are unlayered, so the inner span carries the
 *  style rather than the heading. */
const SubLabel = ({ children, live = false }: { children: ReactNode; live?: boolean }) => (
    <Reveal className="flex items-center gap-4 mb-6">
        <h3 className="shrink-0 inline-flex items-center gap-2.5">
            <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-fg-muted font-medium">
                {children}
            </span>
            {live && <PingDot />}
        </h3>
        <span aria-hidden className="h-px flex-1 bg-line" />
    </Reveal>
);

/** One card for both lists, so work in progress and papers read as a single thread: title, people,
 *  where and when, then an optional smaller note. The whole card is the link. */
const ResearchCard = ({
    title,
    people,
    meta,
    note,
    link,
}: {
    title: string;
    people: ReactNode;
    meta: string;
    note?: string;
    link: string;
}) => (
    <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="group block bg-surface p-6 rounded-sm border border-line hover:border-accent/50 transition-all duration-300"
    >
        {/* gap-4 and shrink-0: on a phone a long title would otherwise squeeze the arrow down to a dot. */}
        <div className="flex justify-between items-start gap-4">
            <div>
                <h4 className="font-bold text-lg text-fg group-hover:text-accent transition-colors font-display">
                    {title}
                </h4>
                <p className="text-sm text-fg-soft mt-2">{people}</p>
                <p className="text-sm text-fg-soft mt-1 font-mono">{meta}</p>
                {note && <p className="text-xs text-fg-soft mt-1">{note}</p>}
            </div>
            <ArrowUpRight className="shrink-0 text-fg-muted group-hover:text-accent transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
    </a>
);

export const Research = () => (
    <section id="research" className="py-16 bg-bg-subtle">
        <div className="container mx-auto px-6 max-w-5xl">
            <Reveal className="mb-12">
                <h2 className="text-4xl lg:text-5xl font-bold text-fg mb-4 font-display flex items-center gap-3">
                    <Microscope className="text-accent" size={32} />
                    Research
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

            {CURRENT.length > 0 && (
                <>
                    <SubLabel live>Current</SubLabel>
                    <StaggerGroup className="grid gap-6 mb-12" stagger={0.1}>
                        {CURRENT.map((r) => (
                            <StaggerItem key={r.area}>
                                <ResearchCard
                                    title={r.area}
                                    people={r.byline}
                                    meta={`${r.place} • ${r.date}`}
                                    note={r.note}
                                    link={r.link}
                                />
                            </StaggerItem>
                        ))}
                    </StaggerGroup>
                </>
            )}

            <SubLabel>Publications</SubLabel>
            <StaggerGroup className="grid gap-6" stagger={0.1}>
                {PUBLICATIONS.map((pub) => (
                    <StaggerItem key={pub.title}>
                        <ResearchCard
                            title={pub.title}
                            people={pub.authors.map((name, j) => (
                                <Fragment key={name}>
                                    {j > 0 && ", "}
                                    {SELF.has(name) ? <strong className="font-semibold text-fg">{name}</strong> : name}
                                </Fragment>
                            ))}
                            meta={`${pub.conference} • ${pub.date}`}
                            note={pub.note}
                            link={pub.link}
                        />
                    </StaggerItem>
                ))}
            </StaggerGroup>
        </div>
    </section>
);
