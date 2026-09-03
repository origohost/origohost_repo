import { test, expect } from "@playwright/test";
import { PUBLIC_ROUTES } from "./routes";
import { budgetFor } from "./budgets";

/**
 * Enforces per-route motion budgets so a runaway animation loop or a
 * new heavy transition can't sneak in. On failure the assertion prints
 * a per-route breakdown of what exceeded which threshold.
 */

interface Snapshot {
  runningAnimations: number;
  maxAnimationDuration: number;
  maxTransitionDuration: number;
  infiniteAnimations: number;
  offenders: Array<{ kind: string; selector: string; value: string }>;
}

async function collect(page: import("@playwright/test").Page): Promise<Snapshot> {
  return page.evaluate(() => {
    const out = {
      runningAnimations: 0,
      maxAnimationDuration: 0,
      maxTransitionDuration: 0,
      infiniteAnimations: 0,
      offenders: [] as Array<{ kind: string; selector: string; value: string }>,
    };
    function label(el: Element) {
      const e = el as HTMLElement;
      const cls = typeof e.className === "string" ? e.className.slice(0, 40) : "";
      return `${e.tagName.toLowerCase()}${e.id ? "#" + e.id : ""}${cls ? "." + cls : ""}`;
    }
    for (const el of Array.from(document.querySelectorAll("*"))) {
      const s = getComputedStyle(el);
      if (s.animationName && s.animationName !== "none") {
        out.runningAnimations++;
        const durs = s.animationDuration.split(",").map((d) => parseFloat(d));
        const maxDur = Math.max(...durs, 0);
        if (maxDur > out.maxAnimationDuration) {
          out.maxAnimationDuration = maxDur;
          out.offenders.push({
            kind: "animation-duration",
            selector: label(el),
            value: s.animationDuration,
          });
        }
        const iters = s.animationIterationCount.split(",").map((i) => i.trim());
        if (iters.includes("infinite") && maxDur >= 4) out.infiniteAnimations++;
      }
      if (s.transitionProperty && s.transitionProperty !== "none") {
        const tdurs = s.transitionDuration.split(",").map((d) => parseFloat(d));
        const maxT = Math.max(...tdurs, 0);
        if (maxT > out.maxTransitionDuration) {
          out.maxTransitionDuration = maxT;
          out.offenders.push({
            kind: "transition-duration",
            selector: label(el),
            value: s.transitionDuration,
          });
        }
      }
    }
    return out;
  });
}

for (const route of PUBLIC_ROUTES) {
  test(`motion budget: ${route}`, async ({ page }) => {
    await page.goto(route);
    await page.waitForLoadState("networkidle");
    const snap = await collect(page);
    const budget = budgetFor(route);
    const failures: string[] = [];
    if (snap.runningAnimations > budget.maxRunningAnimations)
      failures.push(
        `running animations ${snap.runningAnimations} > ${budget.maxRunningAnimations}`,
      );
    if (snap.maxAnimationDuration > budget.maxAnimationDurationSec)
      failures.push(
        `max animation-duration ${snap.maxAnimationDuration}s > ${budget.maxAnimationDurationSec}s`,
      );
    if (snap.maxTransitionDuration > budget.maxTransitionDurationSec)
      failures.push(
        `max transition-duration ${snap.maxTransitionDuration}s > ${budget.maxTransitionDurationSec}s`,
      );
    if (snap.infiniteAnimations > budget.maxInfiniteAnimations)
      failures.push(
        `infinite animations ${snap.infiniteAnimations} > ${budget.maxInfiniteAnimations}`,
      );

    if (failures.length) {
      const offenders = snap.offenders
        .slice(-5)
        .map((o) => `    - [${o.kind}] ${o.selector} = ${o.value}`)
        .join("\n");
      throw new Error(
        `Motion budget exceeded on ${route}:\n  ${failures.join("\n  ")}\n  offenders:\n${offenders}`,
      );
    }
    expect(failures).toEqual([]);
  });
}
