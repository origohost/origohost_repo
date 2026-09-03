"use client";

import { useReducedMotion } from "framer-motion";
import { lazy, Suspense, type ComponentProps, type ReactNode } from "react";

/**
 * Lazy-loaded, reduced-motion-aware wrappers around motion primitives.
 * Route components should import from here instead of the primitives
 * module directly — the heavy framer-motion primitives ship in a
 * separate chunk and static fallbacks render for reduced-motion users.
 */

const Primitives = {
  FadeIn: lazy(() => import("@/components/motion/primitives").then((m) => ({ default: m.FadeIn }))),
  SlideIn: lazy(() =>
    import("@/components/motion/primitives").then((m) => ({ default: m.SlideIn })),
  ),
  ScaleIn: lazy(() =>
    import("@/components/motion/primitives").then((m) => ({ default: m.ScaleIn })),
  ),
  Stagger: lazy(() =>
    import("@/components/motion/primitives").then((m) => ({ default: m.Stagger })),
  ),
  Reveal: lazy(() => import("@/components/motion/primitives").then((m) => ({ default: m.Reveal }))),
  Counter: lazy(() =>
    import("@/components/motion/primitives").then((m) => ({ default: m.Counter })),
  ),
  Typewriter: lazy(() =>
    import("@/components/motion/primitives").then((m) => ({ default: m.Typewriter })),
  ),
  Parallax: lazy(() =>
    import("@/components/motion/primitives").then((m) => ({ default: m.Parallax })),
  ),
  Marquee: lazy(() =>
    import("@/components/motion/primitives").then((m) => ({ default: m.Marquee })),
  ),
  Magnetic: lazy(() =>
    import("@/components/motion/primitives").then((m) => ({ default: m.Magnetic })),
  ),
  Tilt: lazy(() => import("@/components/motion/primitives").then((m) => ({ default: m.Tilt }))),
  Card3D: lazy(() => import("@/components/motion/primitives").then((m) => ({ default: m.Card3D }))),
  BackgroundOrbs: lazy(() =>
    import("@/components/motion/primitives").then((m) => ({ default: m.BackgroundOrbs })),
  ),
} as const;

function StaticFallback({ children, className }: { children?: ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}

function makeLazy<K extends keyof typeof Primitives>(
  key: K,
  staticRender?: (props: ComponentProps<(typeof Primitives)[K]>) => ReactNode,
) {
  const Comp = Primitives[key];
  return function LazyMotion(props: ComponentProps<(typeof Primitives)[K]>) {
    const reduced = useReducedMotion();
    if (reduced && staticRender) {
      return <>{staticRender(props)}</>;
    }
    return (
      <Suspense
        fallback={
          <StaticFallback className={(props as { className?: string }).className}>
            {(props as { children?: ReactNode }).children}
          </StaticFallback>
        }
      >
        {(() => {
          const AnyComp = Comp as unknown as (p: unknown) => ReactNode;
          return <AnyComp {...(props as unknown as object)} />;
        })()}
      </Suspense>
    );
  };
}

export const FadeIn = makeLazy("FadeIn", (p) => <div className={p.className}>{p.children}</div>);
export const SlideIn = makeLazy("SlideIn", (p) => <div className={p.className}>{p.children}</div>);
export const ScaleIn = makeLazy("ScaleIn", (p) => <div className={p.className}>{p.children}</div>);
export const Stagger = makeLazy("Stagger", (p) => <div className={p.className}>{p.children}</div>);
export const Reveal = makeLazy("Reveal", (p) => <span className={p.className}>{p.text}</span>);
export const Counter = makeLazy("Counter", (p) => (
  <span className={p.className}>
    {p.prefix ?? ""}
    {p.format ? p.format(p.value) : p.value.toLocaleString()}
    {p.suffix ?? ""}
  </span>
));
export const Typewriter = makeLazy("Typewriter", (p) => (
  <span className={p.className}>{p.words[0] ?? ""}</span>
));
export const Parallax = makeLazy("Parallax", (p) => (
  <div className={p.className}>{p.children}</div>
));
export const Marquee = makeLazy("Marquee", (p) => <div className={p.className}>{p.children}</div>);
export const Magnetic = makeLazy("Magnetic", (p) => (
  <span className={p.className}>{p.children}</span>
));
export const Tilt = makeLazy("Tilt", (p) => <div className={p.className}>{p.children}</div>);
export const Card3D = makeLazy("Card3D", (p) => <div className={p.className}>{p.front}</div>);
export const BackgroundOrbs = makeLazy("BackgroundOrbs", () => null);
