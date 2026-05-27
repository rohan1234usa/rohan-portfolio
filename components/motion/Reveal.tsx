"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ReactNode } from "react";
import { DURATION, EASE_OUT_QUAD, VIEWPORT } from "./tokens";

interface RevealProps {
    children: ReactNode;
    delay?: number;
    direction?: "up" | "down" | "left" | "right" | "none";
    y?: number;
    duration?: number;
    className?: string;
    as?: "div" | "section" | "header" | "li" | "span" | "article";
}

export const Reveal = ({
    children,
    delay = 0,
    direction = "up",
    y = 24,
    duration = DURATION.base,
    className,
    as = "div",
}: RevealProps) => {
    const reduce = useReducedMotion();

    const offset = reduce
        ? { x: 0, y: 0 }
        : direction === "up"
            ? { x: 0, y }
            : direction === "down"
                ? { x: 0, y: -y }
                : direction === "left"
                    ? { x: y, y: 0 }
                    : direction === "right"
                        ? { x: -y, y: 0 }
                        : { x: 0, y: 0 };

    const variants: Variants = {
        hidden: { opacity: 0, ...offset },
        show: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: { duration: reduce ? 0 : duration, delay: reduce ? 0 : delay, ease: EASE_OUT_QUAD },
        },
    };

    const MotionTag = motion[as];

    return (
        <MotionTag
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            variants={variants}
            className={className}
        >
            {children}
        </MotionTag>
    );
};
