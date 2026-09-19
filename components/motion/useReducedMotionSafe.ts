"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

const subscribe = (onChange: () => void) => {
    const mq = window.matchMedia(QUERY);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
};

/**
 * Hydration-safe `prefers-reduced-motion`. Use this instead of framer-motion's `useReducedMotion`,
 * which is null on the server but already true on a reduced-motion user's first client render —
 * so anything rendered from it (initial variants, text, element types) fails hydration. This
 * reports false for the server and hydration renders, then the real preference right after.
 */
export const useReducedMotionSafe = () =>
    useSyncExternalStore(subscribe, () => window.matchMedia(QUERY).matches, () => false);
