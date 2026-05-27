"use client";

import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { ReactNode, useRef, MouseEvent } from "react";

interface MagneticProps {
    children: ReactNode;
    strength?: number;
    className?: string;
}

export const Magnetic = ({ children, strength = 0.25, className }: MagneticProps) => {
    const reduce = useReducedMotion();
    const ref = useRef<HTMLSpanElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
    const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

    const onMove = (e: MouseEvent<HTMLSpanElement>) => {
        if (reduce || !ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const relX = e.clientX - (rect.left + rect.width / 2);
        const relY = e.clientY - (rect.top + rect.height / 2);
        x.set(relX * strength);
        y.set(relY * strength);
    };

    const onLeave = () => {
        x.set(0);
        y.set(0);
    };

    if (reduce) return <span className={className}>{children}</span>;

    return (
        <motion.span
            ref={ref}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            style={{ x: springX, y: springY, display: "inline-flex" }}
            className={className}
        >
            {children}
        </motion.span>
    );
};
