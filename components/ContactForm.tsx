"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2 } from "lucide-react";

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
                className="bg-white dark:bg-brand-surface border border-brand-charcoal/10 dark:border-brand-cream/10 p-8 rounded-sm text-center"
            >
                <CheckCircle2 className="mx-auto text-emerald-500 mb-4" size={36} />
                <h3 className="text-xl font-display font-bold text-brand-navy dark:text-brand-cream mb-2">
                    Message sent — thanks.
                </h3>
                <p className="text-brand-charcoal/70 dark:text-brand-cream/70 text-sm">
                    I&apos;ll reply within 24 hours.
                </p>
                <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-6 text-sm font-medium text-brand-purple dark:text-brand-gold hover:underline"
                >
                    Send another
                </button>
            </motion.div>
        );
    }

    const disabled = status === "submitting";

    return (
        <form onSubmit={onSubmit} className="bg-white dark:bg-brand-surface border border-brand-charcoal/10 dark:border-brand-cream/10 p-8 rounded-sm">
            {/* Honeypot — hidden from users */}
            <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute left-[-9999px] w-px h-px opacity-0"
            />

            <div className="grid md:grid-cols-2 gap-4 mb-4">
                <label className="block">
                    <span className="block text-xs uppercase tracking-wider text-brand-charcoal/60 dark:text-brand-cream/60 font-medium mb-2">
                        Name
                    </span>
                    <input
                        type="text"
                        name="name"
                        required
                        maxLength={200}
                        disabled={disabled}
                        className="w-full px-4 py-3 bg-brand-cream/40 dark:bg-brand-ink/60 border border-brand-charcoal/15 dark:border-brand-cream/15 rounded-sm text-sm text-brand-navy dark:text-brand-cream placeholder:text-brand-charcoal/40 dark:placeholder:text-brand-cream/40 focus:outline-none focus:border-brand-purple dark:focus:border-brand-gold transition-colors"
                        placeholder="Your name"
                    />
                </label>
                <label className="block">
                    <span className="block text-xs uppercase tracking-wider text-brand-charcoal/60 dark:text-brand-cream/60 font-medium mb-2">
                        Email
                    </span>
                    <input
                        type="email"
                        name="email"
                        required
                        disabled={disabled}
                        className="w-full px-4 py-3 bg-brand-cream/40 dark:bg-brand-ink/60 border border-brand-charcoal/15 dark:border-brand-cream/15 rounded-sm text-sm text-brand-navy dark:text-brand-cream placeholder:text-brand-charcoal/40 dark:placeholder:text-brand-cream/40 focus:outline-none focus:border-brand-purple dark:focus:border-brand-gold transition-colors"
                        placeholder="you@example.com"
                    />
                </label>
            </div>

            <label className="block mb-4">
                <span className="block text-xs uppercase tracking-wider text-brand-charcoal/60 dark:text-brand-cream/60 font-medium mb-2">
                    Message
                </span>
                <textarea
                    name="message"
                    required
                    rows={5}
                    maxLength={5000}
                    disabled={disabled}
                    className="w-full px-4 py-3 bg-brand-cream/40 dark:bg-brand-ink/60 border border-brand-charcoal/15 dark:border-brand-cream/15 rounded-sm text-sm text-brand-navy dark:text-brand-cream placeholder:text-brand-charcoal/40 dark:placeholder:text-brand-cream/40 focus:outline-none focus:border-brand-purple dark:focus:border-brand-gold transition-colors resize-y"
                    placeholder="What are you working on?"
                />
            </label>

            {status === "error" && (
                <p className="mb-4 text-sm text-red-600">{errorMsg}</p>
            )}

            <div className="flex items-center justify-between flex-wrap gap-4">
                <button
                    type="submit"
                    disabled={disabled}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-brand-navy dark:bg-brand-cream dark:text-brand-navy text-white font-medium rounded-sm hover:bg-brand-purple dark:hover:bg-brand-gold transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    {disabled ? "Sending..." : "Send message"}
                    <Send size={16} />
                </button>
                <span className="text-xs text-brand-charcoal/55 dark:text-brand-cream/55">
                    Typical response within 24 hours.
                </span>
            </div>
        </form>
    );
};
