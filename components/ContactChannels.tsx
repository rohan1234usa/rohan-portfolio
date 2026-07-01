"use client";

import { useState } from "react";
import { Mail, Linkedin, Github, FileText, Copy, Check } from "lucide-react";
import { StaggerGroup, StaggerItem } from "./motion/StaggerGroup";

const EMAIL = "rohans9@uci.edu";

const CHANNELS = [
    { label: "LinkedIn", href: "https://linkedin.com/in/rohan123", Icon: Linkedin, external: true },
    { label: "GitHub", href: "https://github.com/rohan1234usa", Icon: Github, external: true },
    { label: "Resume", href: "/resume.pdf", Icon: FileText, external: true },
] as const;

const pill =
    "inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium tracking-wide text-fg-soft border-b border-line-strong hover:text-accent hover:border-accent transition-colors focus:outline-none focus:shadow-[0_0_0_3px_var(--ring)] rounded-sm";

export const ContactChannels = () => {
    const [copied, setCopied] = useState(false);

    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText(EMAIL);
            setCopied(true);
            setTimeout(() => setCopied(false), 1600);
        } catch {
            /* clipboard unavailable — the mailto: link remains the primary affordance */
        }
    };

    return (
        <StaggerGroup as="ul" stagger={0.05} className="flex flex-wrap items-center gap-3 mb-8">
            <StaggerItem as="li" className="inline-flex items-center gap-1">
                <a href={`mailto:${EMAIL}`} className={pill}>
                    <Mail size={14} />
                    {EMAIL}
                </a>
                <button
                    type="button"
                    onClick={copyEmail}
                    aria-label={copied ? "Email copied" : "Copy email address"}
                    className="inline-flex items-center justify-center p-1.5 text-fg-muted hover:text-accent transition-colors focus:outline-none focus:shadow-[0_0_0_3px_var(--ring)] rounded-sm"
                >
                    {copied ? <Check size={14} className="text-status" /> : <Copy size={14} />}
                </button>
            </StaggerItem>

            {CHANNELS.map(({ label, href, Icon, external }) => (
                <StaggerItem as="li" key={label} className="inline-flex">
                    <a
                        href={href}
                        className={pill}
                        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                        <Icon size={14} />
                        {label}
                    </a>
                </StaggerItem>
            ))}
        </StaggerGroup>
    );
};
