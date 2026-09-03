# Animation Regression Checklist

Run through this list after any change that touches `src/components/motion/**`,
`src/lib/motion-config.ts`, `src/styles.css`, or a page hero.

Test on **desktop (≥1280 px)** and **mobile (≤420 px, DevTools iPhone 14)**.
Toggle **DevTools → Rendering → Emulate CSS media feature `prefers-reduced-motion: reduce`**
for the reduced-motion pass.

## Global

- [ ] `ScrollProgress` bar animates from 0 → 100 % as you scroll every route.
- [ ] `PageTransition` fades routes in/out with the same easing & duration
      everywhere (config: `pageVariants` in `src/lib/motion-config.ts`).
- [ ] Header remains sticky and does not jitter during route change.
- [ ] Skip-link and header nav are keyboard-navigable with visible focus rings.
- [ ] Reduced-motion pass: page transition becomes an instant crossfade,
      marquees / blobs / floats stop animating.

## Home (`/`)

- [ ] Blurred hero background image loads without layout shift.
- [ ] `BackgroundOrbs` float + morph on desktop; collapse to a static
      gradient under reduced-motion.
- [ ] `Typewriter` cycles taglines without console errors.
- [ ] Stat `Counter`s animate from 0 to target once they enter the viewport.
- [ ] Magnetic CTA buttons keep hit-target ≥ 44 × 44 px on mobile and are
      reachable via Tab with a visible focus ring.

## About (`/about`)

- [ ] Founder card renders (image, fallback initials if image fails).
- [ ] Tilt card responds to pointer, resets on leave, and is disabled
      under reduced-motion.
- [ ] Number strip counters animate; timeline items reveal on scroll.

## Events / Jobs / Gallery / Partners / FAQ

- [ ] Cards stagger-reveal once, no re-run when scrolling back.
- [ ] Hover lifts, marquee, and shine effects pause under reduced-motion.
- [ ] Filter chips and accordions are keyboard-operable (`Enter`/`Space`).

## Contact / Login / Register / Forgot

- [ ] Form fields cascade in on mount, submit button pulse-glow visible.
- [ ] Inputs remain focus-visible with a ring while animations play.
- [ ] Error messages appear inline without layout shift.

## 3D primitives

- [ ] `Card3D` flips on hover **and** on `Enter`/`Space` when focused.
- [ ] Under reduced-motion, `Card3D` renders front + back stacked without
      the flip transform.

## Performance

- [ ] Lighthouse (mobile) INP < 200 ms on `/`.
- [ ] `bun run build` succeeds; motion primitives ship in a separate chunk
      (`src/components/motion/lazy.tsx` lazy imports).
- [ ] No console warnings about missing `prefers-reduced-motion` or
      unmount errors from `AnimatePresence`.
