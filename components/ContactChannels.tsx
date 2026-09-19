"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Copy, FileText, Github, Linkedin, Mail } from "lucide-react";
import { StaggerGroup, StaggerItem } from "./motion/StaggerGroup";
import { LINKS } from "@/lib/links";

const CHANNELS = [
    { label: "LinkedIn", value: "/in/rohan123", href: LINKS.linkedin, Icon: Linkedin },
    { label: "GitHub", value: "@rohan1234usa", href: LINKS.github, Icon: Github },
    { label: "Resume", value: "View PDF", href: LINKS.resume, Icon: FileText },
] as const;

const row = "flex items-center gap-4 py-3.5 border-b border-line";
const label =
    "inline-flex items-center gap-2 w-28 shrink-0 font-mono text-[11px] tracking-[0.16em] uppercase text-fg-muted";
const focusRing = "outline-none focus-visible:shadow-[0_0_0_3px_var(--ring)]";

export const ContactChannels = () => {
    const [copied, setCopied] = useState(false);

    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText(LINKS.email);
            setCopied(true);
            setTimeout(() => setCopied(false), 1600);
        } catch {
            /* clipboard unavailable — the mailto: link remains the primary affordance */
        }
    };

    return (
        <StaggerGroup as="ul" stagger={0.05} className="border-t border-line">
            <StaggerItem as="li" className={row}>
                <span className={label}>
                    <Mail aria-hidden size={13} />
                    Email
                </span>
                <a
                    href={`mailto:${LINKS.email}`}
                    className={`min-w-0 flex-1 truncate text-sm font-medium text-fg hover:text-accent transition-colors ${focusRing}`}
                >
                    {LINKS.email}
                </a>
                <button
                    type="button"
                    onClick={copyEmail}
                    aria-label={copied ? "Email copied" : "Copy email address"}
                    className={`p-1.5 -m-1.5 text-fg-muted hover:text-accent transition-colors rounded-sm ${focusRing}`}
                >
                    {copied ? <Check size={14} className="text-status" /> : <Copy size={14} />}
                </button>
            </StaggerItem>

            {CHANNELS.map(({ label: name, value, href, Icon }) => (
                <StaggerItem as="li" key={name}>
                    <a href={href} target="_blank" rel="noopener noreferrer" className={`group ${row} ${focusRing}`}>
                        <span className={label}>
                            <Icon aria-hidden size={13} />
                            {name}
                        </span>
                        <span className="flex-1 text-sm font-medium text-fg group-hover:text-accent transition-colors">
                            {value}
                        </span>
                        <ArrowUpRight
                            aria-hidden
                            size={14}
                            className="text-fg-muted group-hover:text-accent transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                    </a>
                </StaggerItem>
            ))}
        </StaggerGroup>
    );
};
