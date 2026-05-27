export const EASE_OUT_QUAD: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const DURATION = {
    short: 0.4,
    base: 0.7,
    long: 1.1,
} as const;

export const STAGGER = {
    children: 0.08,
    chips: 0.035,
} as const;

export const VIEWPORT = {
    once: true,
    margin: "-10% 0px",
} as const;
