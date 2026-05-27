"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

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

export const CountUp = ({ value, duration = 1.4, className }: CountUpProps) => {
    const reduce = useReducedMotion();
    const ref = useRef<HTMLSpanElement>(null);
    const { target, suffix, decimals } = parse(value);
    const [display, setDisplay] = useState(reduce ? value : `${(0).toFixed(decimals)}${suffix}`);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        let rafId = 0;
        let observer: IntersectionObserver | null = null;

        const begin = () => {
            if (reduce) {
                setDisplay(value);
                return;
            }
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
        };

        const rect = el.getBoundingClientRect();
        const visible = rect.top < window.innerHeight && rect.bottom > 0;
        if (visible) {
            begin();
        } else if (typeof IntersectionObserver !== "undefined") {
            observer = new IntersectionObserver(
                (entries) => {
                    for (const entry of entries) {
                        if (entry.isIntersecting) {
                            begin();
                            observer?.disconnect();
                            break;
                        }
                    }
                },
                { threshold: 0.2 }
            );
            observer.observe(el);
        } else {
            begin();
        }

        return () => {
            cancelAnimationFrame(rafId);
            observer?.disconnect();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <span ref={ref} className={className}>
            {display}
        </span>
    );
};
