"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

interface Segment {
    text: string;
    className?: string;
}

interface TypingCodeProps {
    segments: Segment[];
    speed?: number;
    startDelay?: number;
    className?: string;
    pre?: boolean;
    caret?: ReactNode;
}

export const TypingCode = ({
    segments,
    speed = 22,
    startDelay = 0,
    className,
    pre = true,
    caret,
}: TypingCodeProps) => {
    const reduce = useReducedMotion();
    const wrapperRef = useRef<HTMLElement | null>(null);
    const [typed, setTyped] = useState<number[]>(() => segments.map(() => 0));
    const [done, setDone] = useState(false);

    useEffect(() => {
        const el = wrapperRef.current;
        let observer: IntersectionObserver | null = null;
        let startTimer = 0;
        let timerId = 0;

        const begin = () => {
            if (reduce) {
                setTyped(segments.map((s) => s.text.length));
                setDone(true);
                return;
            }

            // Reset state on (re)start to handle strict-mode double-mount cleanly.
            setTyped(segments.map(() => 0));
            setDone(false);

            let segIdx = 0;
            let charIdx = 0;

            const tick = () => {
                if (segIdx >= segments.length) {
                    setDone(true);
                    return;
                }
                const seg = segments[segIdx];
                if (charIdx >= seg.text.length) {
                    segIdx++;
                    charIdx = 0;
                    timerId = window.setTimeout(tick, speed);
                    return;
                }
                charIdx++;
                const snapSeg = segIdx;
                const snapChar = charIdx;
                setTyped((prev) => {
                    const next = [...prev];
                    next[snapSeg] = snapChar;
                    return next;
                });
                timerId = window.setTimeout(tick, speed);
            };

            startTimer = window.setTimeout(tick, startDelay);
        };

        if (!el) {
            begin();
        } else {
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
                    { threshold: 0.1 }
                );
                observer.observe(el);
            } else {
                begin();
            }
        }

        return () => {
            window.clearTimeout(startTimer);
            window.clearTimeout(timerId);
            observer?.disconnect();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const content = (
        <>
            {segments.map((seg, i) => (
                <span key={i} className={seg.className}>
                    {seg.text.slice(0, typed[i])}
                </span>
            ))}
            {caret && (
                <span
                    aria-hidden
                    className={done ? "opacity-0" : "inline-block animate-pulse"}
                >
                    {caret}
                </span>
            )}
        </>
    );

    if (pre) {
        return (
            <pre
                ref={(el) => {
                    wrapperRef.current = el;
                }}
                className={className}
            >
                {content}
            </pre>
        );
    }
    return (
        <span
            ref={(el) => {
                wrapperRef.current = el;
            }}
            className={className}
        >
            {content}
        </span>
    );
};
