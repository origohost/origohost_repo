import { test, expect } from "@playwright/test";
import { PUBLIC_ROUTES } from "./routes";

/**
 * Runs only under the `reduced-motion` project (see playwright.config.ts).
 * The context sets `reducedMotion: 'reduce'`, activating the global
 * @media rule in styles.css that clamps every animation to ~0ms.
 */

for (const route of PUBLIC_ROUTES) {
  test(`no long-running animations on ${route}`, async ({ page }) => {
    await page.goto(route);
    await page.waitForLoadState("networkidle");

    const longAnimations = await page.evaluate(() => {
      const bad: { selector: string; duration: string; name: string }[] = [];
      for (const el of Array.from(document.querySelectorAll("*"))) {
        const s = getComputedStyle(el);
        if (s.animationName === "none" || s.animationName === "") continue;
        const durations = s.animationDuration.split(",").map((d) => parseFloat(d.trim()));
        if (durations.some((d) => d > 0.05)) {
          const e = el as HTMLElement;
          bad.push({
            selector:
              e.tagName.toLowerCase() +
              (e.id ? `#${e.id}` : "") +
              (typeof e.className === "string" && e.className
                ? `.${e.className.slice(0, 40)}`
                : ""),
            duration: s.animationDuration,
            name: s.animationName,
          });
        }
      }
      return bad.slice(0, 5);
    });
    expect(longAnimations, JSON.stringify(longAnimations, null, 2)).toEqual([]);

    // Transitions should also be clamped.
    const longTransitions = await page.evaluate(() => {
      const bad: string[] = [];
      for (const el of Array.from(document.querySelectorAll("*"))) {
        const s = getComputedStyle(el);
        if (s.transitionProperty === "none" || s.transitionProperty === "all 0s ease 0s") continue;
        const durations = s.transitionDuration.split(",").map((d) => parseFloat(d.trim()));
        if (durations.some((d) => d > 0.05)) {
          bad.push(`${(el as HTMLElement).tagName}: ${s.transitionDuration}`);
        }
        if (bad.length >= 5) break;
      }
      return bad;
    });
    expect(longTransitions, longTransitions.join("\n")).toEqual([]);
  });

  test(`page transition is an instant crossfade on ${route}`, async ({ page }) => {
    await page.goto(route);
    await page.waitForLoadState("networkidle");
    const y = await page.evaluate(() => {
      const main = document.querySelector("main > *") as HTMLElement | null;
      if (!main) return 0;
      const t = getComputedStyle(main).transform;
      if (t === "none") return 0;
      const m = t.match(/matrix\(([^)]+)\)/);
      return m ? parseFloat(m[1].split(",")[5] ?? "0") : 0;
    });
    expect(Math.abs(y)).toBeLessThan(1);
  });
}
