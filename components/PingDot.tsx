/** The live-work dot: --status gold with a ping, beside a label for work still in progress — the
 *  "Now building" band in Projects, the "Current" label in Research, and the "Up next" card's pill in
 *  Education. It has the same geometry as the prelaunch eyebrow's dot in Projects, which is --accent-warm
 *  instead. Both read as UCI gold in light mode, so never place this one beside a prelaunch dot. Shared so
 *  the labels can't drift. */
export const PingDot = () => (
    <span aria-hidden className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full rounded-full bg-status opacity-75 animate-ping motion-reduce:animate-none" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-status" />
    </span>
);
