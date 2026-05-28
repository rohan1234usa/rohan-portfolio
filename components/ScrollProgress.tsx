"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export const ScrollProgress = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.4 });

    return (
        <motion.div
            aria-hidden
            style={{ scaleX, transformOrigin: "0% 50%" }}
            className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent pointer-events-none"
        />
    );
};
