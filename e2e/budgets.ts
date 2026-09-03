/**
 * Per-route budgets for the animation regression suite. Thresholds
 * intentionally err on the side of "a heavy page is fine, a runaway
 * loop is not". Adjust here rather than in individual specs.
 */

export interface RouteBudget {
  /** Max number of elements with a running keyframe animation. */
  maxRunningAnimations: number;
  /** Max animation-duration in seconds allowed on any single element. */
  maxAnimationDurationSec: number;
  /** Max transition-duration in seconds allowed on any single element. */
  maxTransitionDurationSec: number;
  /** Max long-running (>= 4s) infinite animations (marquee/floats). */
  maxInfiniteAnimations: number;
}

const DEFAULT_BUDGET: RouteBudget = {
  maxRunningAnimations: 40,
  maxAnimationDurationSec: 22,
  maxTransitionDurationSec: 1.2,
  maxInfiniteAnimations: 8,
};

/** Routes with hero orbs / marquees get a slightly higher budget. */
const OVERRIDES: Record<string, Partial<RouteBudget>> = {
  "/": { maxRunningAnimations: 60, maxInfiniteAnimations: 14, maxAnimationDurationSec: 45 },
  "/about": { maxRunningAnimations: 45, maxInfiniteAnimations: 10 },
  "/partners": { maxRunningAnimations: 50, maxInfiniteAnimations: 12 },
  "/register": { maxRunningAnimations: 55, maxInfiniteAnimations: 10 },
};

export function budgetFor(route: string): RouteBudget {
  return { ...DEFAULT_BUDGET, ...(OVERRIDES[route] ?? {}) };
}
