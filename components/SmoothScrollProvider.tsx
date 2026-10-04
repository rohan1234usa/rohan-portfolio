"use client";

import { useEffect } from "react";
import { MotionConfig } from "framer-motion";
import Lenis from "lenis";

// The page's single Lenis instance, owned by the provider below. Stays null under
// prefers-reduced-motion, where smooth scrolling never starts.
let lenis: Lenis | null = null;

/** Freeze page scrolling — e.g. while the full-screen mobile menu is open. */
export const lockScroll = () => {
    document.documentElement.style.overflow = "hidden";
    lenis?.stop();
};

export const unlockScroll = () => {
    document.documentElement.style.overflow = "";
    // start() re-syncs Lenis with the real scroll position, so anchor jumps made while locked stick.
    lenis?.start();
};

export const scrollToTop = () => {
    // No Lenis means reduced motion, so jump instead of animating.
    if (lenis) lenis.scrollTo(0);
    else window.scrollTo({ top: 0 });
};

/** Snap to the top with no glide, as a fresh load would. */
export const jumpToTop = () => {
    if (!lenis) {
        window.scrollTo({ top: 0 });
        return;
    }
    // Through Lenis, since a glide still in flight would undo a bare window.scrollTo. resize()
    // re-reads the real position first: Lenis hears of native jumps (an #anchor link) only on the
    // next scroll event, and skips a scroll to where it still thinks it is.
    lenis.resize();
    lenis.scrollTo(0, { immediate: true });
};

/** Fired on window when the navbar wordmark sends the visitor home; the hero replays its entrance. */
export const HOME_EVENT = "portfolio:home";

export const SmoothScrollProvider = ({ children }: { children: React.ReactNode }) => {
    useEffect(() => {
        if (typeof window === "undefined") return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const instance = new Lenis({
            lerp: 0.1,
            duration: 1.1,
            wheelMultiplier: 1,
            smoothWheel: true,
        });
        lenis = instance;

        let rafId = 0;
        const raf = (time: number) => {
            instance.raf(time);
            rafId = requestAnimationFrame(raf);
        };
        rafId = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(rafId);
            instance.destroy();
            lenis = null;
        };
    }, []);

    // Entrance animations that start before hydration settles still honor reduced motion:
    // framer skips transform animations for those users at animation time, so markup is unchanged.
    return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
};
