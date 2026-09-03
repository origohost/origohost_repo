/**
 * Central motion configuration. Every animated route/component should
 * pull timing, easing, and variants from here so page transitions,
 * reveals, and micro-interactions stay consistent across the app.
 *
 * When `prefers-reduced-motion: reduce` is active, callers should swap
 * in {@link reducedTransition} / {@link reducedVariants} so movement is
 * replaced by a near-instant crossfade.
 */

import type { Transition, Variants, Easing } from "framer-motion";

/** Canonical easing curve used by every timed animation. */
export const EASE: Easing = [0.2, 0.7, 0.2, 1];

/** Semantic durations (seconds). Keep this list short — reuse, don't invent. */
export const DURATION = {
  micro: 0.18,
  fast: 0.28,
  base: 0.4,
  slow: 0.6,
  hero: 0.85,
} as const;

/** Standard transition presets. */
export const transitions = {
  base: { duration: DURATION.base, ease: EASE } satisfies Transition,
  fast: { duration: DURATION.fast, ease: EASE } satisfies Transition,
  slow: { duration: DURATION.slow, ease: EASE } satisfies Transition,
  spring: { type: "spring", stiffness: 220, damping: 26 } satisfies Transition,
  springSoft: { type: "spring", stiffness: 140, damping: 20 } satisfies Transition,
} as const;

/** Reduced-motion swap: instant crossfade, no translate. */
export const reducedTransition: Transition = { duration: 0.001 };

/** Shared page transition variants — used by <PageTransition />. */
export const pageVariants: Variants = {
  initial: { opacity: 0, scale: 0.98 },
  animate: { opacity: 1, scale: 1, transition: transitions.base },
  exit: { opacity: 0, scale: 1.02, transition: transitions.fast },
};

export const reducedPageVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: reducedTransition },
  exit: { opacity: 0, transition: reducedTransition },
};

/** Shared reveal variants for scroll-triggered content. */
export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: transitions.slow },
};

export const reducedRevealVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: reducedTransition },
};

/** Stagger container defaults. */
export const staggerContainer = {
  hidden: {},
  show: (delayChildren = 0) => ({
    transition: { staggerChildren: 0.08, delayChildren },
  }),
} satisfies Variants;

/** Viewport preset for scroll reveals — fire once, mid-viewport. */
export const VIEWPORT_ONCE = { once: true, amount: 0.2 } as const;
