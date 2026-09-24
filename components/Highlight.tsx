/** A bullet's content: plain text, or a `lead` set in a heavier weight ahead of `text` — for a
 *  list whose bullets name the surface or stage they cover, as the Merge project card's and the
 *  Merge experience entry's do. Shared so the lead's style cannot drift between the two sections.
 *  The renderer adds the colon, so a lead must not carry its own. */
export type Highlight = string | { lead: string; text: string };

/** A stable list key: lead and text together, since two bullets in one list can share a lead. */
export const highlightKey = (h: Highlight) => (typeof h === "string" ? h : `${h.lead}:${h.text}`);

/** The bullet's text with its lead. Renders inside the caller's own `<span>` so each list keeps
 *  its own marker, spacing and motion. */
export const HighlightText = ({ highlight }: { highlight: Highlight }) =>
    typeof highlight === "string" ? (
        <>{highlight}</>
    ) : (
        <>
            <span className="font-medium text-fg">{highlight.lead}: </span>
            {highlight.text}
        </>
    );
