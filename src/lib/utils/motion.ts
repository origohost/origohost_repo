import type { Variants, Transition } from 'framer-motion';

// ─── Timing Constants ─────────────────────────────────────────────────────
export const DURATION = {
  instant: 0,
  fast:    0.15,
  base:    0.25,
  slow:    0.4,
  page:    0.5,
} as const;

export const EASE = {
  out:     [0.16, 1, 0.3, 1],
  in:      [0.7, 0, 0.84, 0],
  inOut:   [0.87, 0, 0.13, 1],
  spring:  { type: 'spring', stiffness: 300, damping: 30 } as Transition,
  springy: { type: 'spring', stiffness: 200, damping: 20 } as Transition,
} as const;

// ─── Fade Up — section reveals ───────────────────────────────────────────
export const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: DURATION.slow, ease: EASE.out } },
};

// ─── Fade In — simple opacity reveal ─────────────────────────────────────
export const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: DURATION.base } },
};

// ─── Fade Up Sm — subtle for inline elements ─────────────────────────────
export const fadeUpSm: Variants = {
  hidden:  { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: DURATION.base, ease: EASE.out } },
};

// ─── Scale In — modal / card entrance ────────────────────────────────────
export const scaleIn: Variants = {
  hidden:  { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: DURATION.base, ease: EASE.out } },
};

// ─── Slide In Left ───────────────────────────────────────────────────────
export const slideInLeft: Variants = {
  hidden:  { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: { duration: DURATION.slow, ease: EASE.out } },
};

// ─── Slide In Right ──────────────────────────────────────────────────────
export const slideInRight: Variants = {
  hidden:  { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0, transition: { duration: DURATION.slow, ease: EASE.out } },
};

// ─── Stagger Container ────────────────────────────────────────────────────
export const staggerContainer: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

export const staggerContainerFast: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.02 } },
};

// ─── Stagger Item ─────────────────────────────────────────────────────────
export const staggerItem: Variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: DURATION.base, ease: EASE.out } },
};

// ─── Card Hover ───────────────────────────────────────────────────────────
export const cardHover = {
  initial: { y: 0 },
  whileHover: { y: -4, transition: { duration: DURATION.base, ease: EASE.out } },
};

// ─── Drawer (mobile menu) ─────────────────────────────────────────────────
export const drawerVariants: Variants = {
  hidden:  { x: '100%', opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: DURATION.slow, ease: EASE.out } },
  exit:    { x: '100%', opacity: 0, transition: { duration: DURATION.base, ease: EASE.in } },
};

// ─── Page Transition ──────────────────────────────────────────────────────
export const pageVariants: Variants = {
  hidden:  { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: DURATION.page, ease: EASE.out } },
  exit:    { opacity: 0, y: -8, transition: { duration: DURATION.base, ease: EASE.in } },
};

// ─── Overlay (modal backdrop) ─────────────────────────────────────────────
export const overlayVariants: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: DURATION.base } },
  exit:    { opacity: 0, transition: { duration: DURATION.fast } },
};

// ─── Helper: viewport config for whileInView ─────────────────────────────
export const viewport = { once: true, amount: 0.15 } as const;
