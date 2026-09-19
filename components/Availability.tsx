import { Briefcase } from "lucide-react";

// Update this one line when availability changes — the hero, mobile menu, and contact section all read it.
export const AVAILABILITY = "Open to SWE/ML internships — Summer 2027";

export const AvailabilityBadge = ({ className = "" }: { className?: string }) => (
    <div
        className={`inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium tracking-wide text-fg-soft border-b border-status/60 ${className}`}
    >
        <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-status opacity-75 animate-ping motion-reduce:animate-none"></span>
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-status"></span>
        </span>
        <Briefcase size={12} className="text-fg" />
        {AVAILABILITY}
    </div>
);
