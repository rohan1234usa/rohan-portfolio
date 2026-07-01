"use client";

import { useState, FormEvent, ChangeEvent, FocusEvent } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { StaggerGroup, StaggerItem } from "./motion/StaggerGroup";
import { Magnetic } from "./motion/Magnetic";

type Status = "idle" | "submitting" | "success" | "error";
type Field = "name" | "email" | "message";
type FieldErrors = Partial<Record<Field, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MESSAGE_MAX = 5000;

function validateField(field: Field, value: string): string | undefined {
    const v = value.trim();
    if (field === "name") {
        if (!v) return "Please enter your name.";
        if (v.length > 200) return "Name is too long.";
    }
    if (field === "email") {
        if (!v) return "Please enter your email.";
        if (!EMAIL_RE.test(v)) return "Please enter a valid email address.";
    }
    if (field === "message") {
        if (!v) return "Please enter a message.";
        if (v.length < 10) return "Message should be at least 10 characters.";
        if (v.length > MESSAGE_MAX) return "Message is too long.";
    }
    return undefined;
}

export const ContactForm = () => {
    const [status, setStatus] = useState<Status>("idle");
    const [errorMsg, setErrorMsg] = useState<string>("");
    const [values, setValues] = useState<Record<Field, string>>({ name: "", email: "", message: "" });
    const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const field = e.target.name as Field;
        const value = e.target.value;
        setValues((prev) => ({ ...prev, [field]: value }));
        // Re-validate live only once the field has been blurred, so errors clear as the user fixes them.
        if (touched[field]) {
            setFieldErrors((prev) => ({ ...prev, [field]: validateField(field, value) }));
        }
    };

    const handleBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const field = e.target.name as Field;
        setTouched((prev) => ({ ...prev, [field]: true }));
        setFieldErrors((prev) => ({ ...prev, [field]: validateField(field, values[field]) }));
    };

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const nextErrors: FieldErrors = {
            name: validateField("name", values.name),
            email: validateField("email", values.email),
            message: validateField("message", values.message),
        };
        setTouched({ name: true, email: true, message: true });
        setFieldErrors(nextErrors);
        if (nextErrors.name || nextErrors.email || nextErrors.message) return;

        setStatus("submitting");
        setErrorMsg("");

        const form = e.currentTarget;
        const website = String(new FormData(form).get("website") ?? "");
        const payload = {
            name: values.name,
            email: values.email,
            message: values.message,
            website,
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
            setValues({ name: "", email: "", message: "" });
            setTouched({});
            setFieldErrors({});
        } catch {
            setStatus("error");
            setErrorMsg("Network error. Please try again.");
        }
    };

    if (status === "success") {
        return (
            <motion.div
                role="status"
                aria-live="polite"
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

    const inputClass = (field: Field) =>
        `w-full px-4 py-3 bg-bg-subtle border rounded-sm text-sm text-fg placeholder:text-fg-muted focus:outline-none transition-colors ${
            touched[field] && fieldErrors[field]
                ? "border-red-500 dark:border-red-400 focus:border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.35)]"
                : "border-line focus:border-accent focus:shadow-[0_0_0_3px_var(--ring)]"
        }`;

    const messageLen = values.message.length;

    return (
        <form onSubmit={onSubmit} noValidate className="bg-surface border border-line p-8 rounded-sm">
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
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            aria-invalid={!!(touched.name && fieldErrors.name)}
                            aria-describedby={touched.name && fieldErrors.name ? "name-error" : undefined}
                            className={inputClass("name")}
                            placeholder="Your name"
                        />
                        {touched.name && fieldErrors.name && (
                            <span id="name-error" className="mt-1.5 block text-xs text-red-600 dark:text-red-400">
                                {fieldErrors.name}
                            </span>
                        )}
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
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            aria-invalid={!!(touched.email && fieldErrors.email)}
                            aria-describedby={touched.email && fieldErrors.email ? "email-error" : undefined}
                            className={inputClass("email")}
                            placeholder="you@example.com"
                        />
                        {touched.email && fieldErrors.email && (
                            <span id="email-error" className="mt-1.5 block text-xs text-red-600 dark:text-red-400">
                                {fieldErrors.email}
                            </span>
                        )}
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
                            maxLength={MESSAGE_MAX}
                            disabled={disabled}
                            value={values.message}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            aria-invalid={!!(touched.message && fieldErrors.message)}
                            aria-describedby={touched.message && fieldErrors.message ? "message-error" : undefined}
                            className={`${inputClass("message")} resize-y`}
                            placeholder="What are you working on?"
                        />
                        <span className="mt-1.5 flex items-start justify-between gap-4">
                            {touched.message && fieldErrors.message ? (
                                <span id="message-error" className="text-xs text-red-600 dark:text-red-400">
                                    {fieldErrors.message}
                                </span>
                            ) : (
                                <span />
                            )}
                            <span
                                aria-live="polite"
                                className={`shrink-0 text-xs tabular-nums ${
                                    messageLen > 4800
                                        ? "text-red-600 dark:text-red-400"
                                        : messageLen > 4500
                                          ? "text-accent-warm"
                                          : "text-fg-muted"
                                }`}
                            >
                                {messageLen}/{MESSAGE_MAX}
                            </span>
                        </span>
                    </label>
                </StaggerItem>

                {status === "error" && (
                    <div
                        role="alert"
                        aria-live="assertive"
                        className="mb-4 flex items-start gap-2 px-4 py-3 rounded-sm border border-red-500/40 bg-red-500/10 text-sm text-red-700 dark:text-red-300"
                    >
                        <AlertCircle size={16} className="mt-0.5 shrink-0" />
                        <span>{errorMsg}</span>
                    </div>
                )}

                <StaggerItem className="flex items-center justify-between flex-wrap gap-4">
                    <Magnetic>
                        <button
                            type="submit"
                            disabled={disabled}
                            className="inline-flex items-center gap-2 px-8 py-4 bg-fg text-bg font-medium rounded-sm hover:bg-accent hover:text-on-accent transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {disabled ? (
                                <>
                                    <Loader2 size={16} className="animate-spin motion-reduce:animate-none" />
                                    Sending
                                </>
                            ) : (
                                <>
                                    Send message
                                    <Send size={16} />
                                </>
                            )}
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
