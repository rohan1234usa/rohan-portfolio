"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2 } from "lucide-react";
import { StaggerGroup, StaggerItem } from "./motion/StaggerGroup";
import { Magnetic } from "./motion/Magnetic";

type Status = "idle" | "submitting" | "success" | "error";

export const ContactForm = () => {
    const [status, setStatus] = useState<Status>("idle");
    const [errorMsg, setErrorMsg] = useState<string>("");

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("submitting");
        setErrorMsg("");

        const form = e.currentTarget;
        const data = new FormData(form);
        const payload = {
            name: String(data.get("name") ?? ""),
            email: String(data.get("email") ?? ""),
            message: String(data.get("message") ?? ""),
            website: String(data.get("website") ?? ""),
        };

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const json = await res.json().catch(() => ({}));
            if (!res.ok) {
                setStatus("error");
                setErrorMsg(json?.error ?? "Something went wrong.");
                return;
            }
            setStatus("success");
            form.reset();
        } catch {
            setStatus("error");
            setErrorMsg("Network error. Please try again.");
        }
    };

    if (status === "success") {
        return (
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-surface border border-line p-8 rounded-sm text-center"
            >
                <CheckCircle2 className="mx-auto text-status mb-4" size={36} />
                <h3 className="text-xl font-display font-bold text-fg mb-2">
                    Message sent — thanks.
                </h3>
                <p className="text-fg-soft text-sm">
                    I&apos;ll reply within 24 hours.
                </p>
                <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-6 text-sm font-medium text-accent hover:underline"
                >
                    Send another
                </button>
            </motion.div>
        );
    }

    const disabled = status === "submitting";

    return (
        <form onSubmit={onSubmit} className="bg-surface border border-line p-8 rounded-sm">
            {/* Honeypot — hidden from users */}
            <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute left-[-9999px] w-px h-px opacity-0"
            />

            <StaggerGroup stagger={0.08}>
                <StaggerItem className="grid md:grid-cols-2 gap-4 mb-4">
                    <label className="block">
                        <span className="block text-xs uppercase tracking-wider text-fg-muted font-medium mb-2">
                            Name
                        </span>
                        <input
                            type="text"
                            name="name"
                            required
                            maxLength={200}
                            disabled={disabled}
                            className="w-full px-4 py-3 bg-bg-subtle border border-line rounded-sm text-sm text-fg placeholder:text-fg-muted focus:outline-none focus:border-accent transition-colors"
                            placeholder="Your name"
                        />
                    </label>
                    <label className="block">
                        <span className="block text-xs uppercase tracking-wider text-fg-muted font-medium mb-2">
                            Email
                        </span>
                        <input
                            type="email"
                            name="email"
                            required
                            disabled={disabled}
                            className="w-full px-4 py-3 bg-bg-subtle border border-line rounded-sm text-sm text-fg placeholder:text-fg-muted focus:outline-none focus:border-accent transition-colors"
                            placeholder="you@example.com"
                        />
                    </label>
                </StaggerItem>

                <StaggerItem>
                    <label className="block mb-4">
                        <span className="block text-xs uppercase tracking-wider text-fg-muted font-medium mb-2">
                            Message
                        </span>
                        <textarea
                            name="message"
                            required
                            rows={5}
                            maxLength={5000}
                            disabled={disabled}
                            className="w-full px-4 py-3 bg-bg-subtle border border-line rounded-sm text-sm text-fg placeholder:text-fg-muted focus:outline-none focus:border-accent transition-colors resize-y"
                            placeholder="What are you working on?"
                        />
                    </label>
                </StaggerItem>

                {status === "error" && (
                    <p className="mb-4 text-sm text-red-600 dark:text-red-400">{errorMsg}</p>
                )}

                <StaggerItem className="flex items-center justify-between flex-wrap gap-4">
                    <Magnetic>
                        <button
                            type="submit"
                            disabled={disabled}
                            className="inline-flex items-center gap-2 px-8 py-4 bg-fg text-bg font-medium rounded-sm hover:bg-accent hover:text-on-accent transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {disabled ? "Sending..." : "Send message"}
                            <Send size={16} />
                        </button>
                    </Magnetic>
                    <span className="text-xs text-fg-muted">
                        Typical response within 24 hours.
                    </span>
                </StaggerItem>
            </StaggerGroup>
        </form>
    );
};
