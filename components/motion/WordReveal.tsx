"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ReactNode } from "react";
import { EASE_OUT_QUAD, VIEWPORT } from "./tokens";

interface WordRevealProps {
    /** Lines of text — each entry is rendered on its own line and split into words. */
    lines: Array<string | ReactNode[]>;
    delay?: number;
    /** Per-word delay step. */
    stagger?: number;
    className?: string;
    /** Class applied to each line wrapper (use for `block`, alignment, etc.). */
    lineClassName?: string;
}

const WORD_VARIANTS: Variants = {
    hidden: { y: "110%" },
    show: (i: number) => ({
        y: "0%",
        transition: { duration: 0.7, delay: i * 0.06, ease: EASE_OUT_QUAD },
    }),
};

const WORD_VARIANTS_REDUCED: Variants = {
    hidden: { y: 0, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0 } },
};

export const WordReveal = ({
    lines,
    delay = 0,
    stagger = 0.06,
    className,
    lineClassName,
}: WordRevealProps) => {
    const reduce = useReducedMotion();
    const variants = reduce ? WORD_VARIANTS_REDUCED : WORD_VARIANTS;

    // Flat index so cross-line stagger is continuous.
    let wordIndex = 0;

    return (
        <motion.span
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className={className}
            transition={{ delayChildren: delay, staggerChildren: stagger }}
        >
            {lines.map((line, lineIdx) => {
                const tokens: ReactNode[] = typeof line === "string" ? line.split(" ") : line;
                return (
                    <span key={lineIdx} className={lineClassName ?? "block"}>
                        {tokens.map((token, tokenIdx) => {
                            const i = wordIndex++;
                            return (
                                <span
                                    key={tokenIdx}
                                    className="inline-block align-bottom [overflow:clip] [overflow-clip-margin:0.3em]"
                                >
                                    <motion.span
                                        className="inline-block"
                                        custom={i}
                                        variants={variants}
                                    >
                                        {token}
                                        {tokenIdx < tokens.length - 1 ? " " : ""}
                                    </motion.span>
                                </span>
                            );
                        })}
                    </span>
                );
            })}
        </motion.span>
    );
};
