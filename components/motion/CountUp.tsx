"use client";

import { useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { VIEWPORT } from "./tokens";

interface CountUpProps {
    value: string;
    duration?: number;
    className?: string;
}

const parse = (raw: string): { target: number; suffix: string; decimals: number } => {
    const match = raw.match(/^(-?\d+(?:\.\d+)?)(.*)$/);
    if (!match) return { target: 0, suffix: raw, decimals: 0 };
    const numStr = match[1];
    const target = parseFloat(numStr);
    const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
    return { target, suffix: match[2] ?? "", decimals };
};

export const CountUp = ({ value, duration = 1.1, className }: CountUpProps) => {
    const reduce = useReducedMotion();
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: VIEWPORT.margin });
    const { target, suffix, decimals } = parse(value);
    const [display, setDisplay] = useState(reduce ? value : `${(0).toFixed(decimals)}${suffix}`);

    useEffect(() => {
        if (!inView) return;
        if (reduce) {
            setDisplay(value);
            return;
        }

        let rafId = 0;
        const start = performance.now();
        const total = duration * 1000;
        const tick = (now: number) => {
            const t = Math.min(1, (now - start) / total);
            const eased = 1 - Math.pow(1 - t, 3);
            const v = eased * target;
            setDisplay(`${v.toFixed(decimals)}${suffix}`);
            if (t < 1) rafId = requestAnimationFrame(tick);
        };
        rafId = requestAnimationFrame(tick);

        return () => cancelAnimationFrame(rafId);
    }, [inView, reduce, value, target, suffix, decimals, duration]);

    return (
        <span ref={ref} className={className}>
            {display}
        </span>
    );
};
