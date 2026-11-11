import { Briefcase } from "lucide-react";

// Update these when availability changes; the hero, mobile menu, and contact section show both lines in
// AvailabilityBadge. MS_PLAN is the short form of the Education section's "Up next" card (NEXT_STUDY in
// components/Education.tsx), so change the two together. Each \u00a0 (no-break space) keeps a term on one
// line: without it, a 320px phone wraps the badge's second line to "…for Fall / 2027".
export const AVAILABILITY = "Open to SWE/ML internships — Summer\u00a02027";
// Applications only, nothing accepted yet, so it says "applying", never "incoming". Once an offer is accepted,
// name it, e.g. "Starting an MS in CS at <school>, Fall 2027".
export const MS_PLAN = "Applying to MS programs for Fall\u00a02027";

// A grid rather than a flex row, so the second line starts under the first line's text, not under the dot.
export const AvailabilityBadge = ({ className = "" }: { className?: string }) => (
    <div
        className={`inline-grid grid-cols-[auto_auto_1fr] items-center gap-x-2 gap-y-0.5 px-3 py-1.5 text-xs font-medium tracking-wide text-fg-soft border-b border-status/60 ${className}`}
    >
        <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-status opacity-75 animate-ping motion-reduce:animate-none"></span>
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-status"></span>
        </span>
        <Briefcase size={12} className="text-fg" />
        <span>{AVAILABILITY}</span>
        {/* Absolutely positioned, so it takes no grid cell: makes screen readers pause between the two lines */}
        <span className="sr-only">. </span>
        {/* fg-soft, not fg-muted: muted is ~3:1 on white, too faint at 12px. The lighter weight sets it apart. */}
        <span className="col-start-3 font-normal">{MS_PLAN}</span>
    </div>
);
