"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

export const ThemeToggle = () => {
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Defer the mount flag to avoid hydration mismatch — server renders
        // a neutral icon, then the client swaps in the correct sun/moon.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    const isDark = mounted && resolvedTheme === "dark";

    return (
        <button
            type="button"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="p-2 text-fg-soft hover:text-accent border border-transparent hover:border-line-strong rounded-sm transition-all duration-300"
        >
            {mounted ? (
                isDark ? <Sun size={20} /> : <Moon size={20} />
            ) : (
                <span className="block w-5 h-5" />
            )}
        </button>
    );
};
