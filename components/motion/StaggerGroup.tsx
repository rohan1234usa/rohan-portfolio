"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ReactNode } from "react";
import { DURATION, EASE_OUT_QUAD, STAGGER, VIEWPORT } from "./tokens";

interface StaggerGroupProps {
    children: ReactNode;
    stagger?: number;
    delayChildren?: number;
    className?: string;
    as?: "div" | "section" | "ul" | "ol" | "header";
    /** Disable the whileInView viewport guard — useful when group lives inside another Reveal. */
    immediate?: boolean;
}

export const StaggerGroup = ({
    children,
    stagger = STAGGER.children,
    delayChildren = 0,
    className,
    as = "div",
    immediate = false,
}: StaggerGroupProps) => {
    const reduce = useReducedMotion();

    const variants: Variants = {
        hidden: {},
        show: {
            transition: {
                staggerChildren: reduce ? 0 : stagger,
                delayChildren: reduce ? 0 : delayChildren,
            },
        },
    };

    const MotionTag = motion[as];

    return (
        <MotionTag
            initial="hidden"
            {...(immediate
                ? { animate: "show" }
                : { whileInView: "show", viewport: VIEWPORT })}
            variants={variants}
            className={className}
        >
            {children}
        </MotionTag>
    );
};

interface StaggerItemProps {
    children: ReactNode;
    y?: number;
    duration?: number;
    className?: string;
    as?: "div" | "li" | "span" | "article" | "section";
}

export const StaggerItem = ({
    children,
    y = 20,
    duration = DURATION.base,
    className,
    as = "div",
}: StaggerItemProps) => {
    const reduce = useReducedMotion();

    const variants: Variants = {
        hidden: { opacity: 0, y: reduce ? 0 : y },
        show: {
            opacity: 1,
            y: 0,
            transition: { duration: reduce ? 0 : duration, ease: EASE_OUT_QUAD },
        },
    };

    const MotionTag = motion[as];

    return (
        <MotionTag variants={variants} className={className}>
            {children}
        </MotionTag>
    );
};
