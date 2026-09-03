import { test, expect } from "@playwright/test";
import { stabilize } from "./helpers";

/**
 * Palette-drift guard.
 *
 * Element-scoped pixel snapshots of the three surfaces most sensitive to
 * a theme change (H2S palette: white canvas + royal-blue primary + pastel
 * feature tints). Any hex/token shift in `src/styles.css` produces a
 * visible diff here before it can leak into production.
 *
 * Snapshots live in e2e/theme-sections.spec.ts-snapshots/ — first CI run
 * writes the baselines via `bun run test:e2e:update`.
 */

test.describe.configure({ mode: "parallel" });

const TARGETS = [
  { route: "/", testid: "hero", name: "home-hero" },
  { route: "/", testid: "what-we-do", name: "home-what-we-do" },
  { route: "/about", testid: "about-header", name: "about-header" },
] as const;

for (const { route, testid, name } of TARGETS) {
  test(`theme snapshot: ${name}`, async ({ page }, testInfo) => {
    await page.goto(route);
    await stabilize(page);
    const region = page.getByTestId(testid);
    await expect(region).toBeVisible();
    await expect(region).toHaveScreenshot(`${name}-${testInfo.project.name}.png`, {
      animations: "disabled",
      caret: "hide",
      scale: "css",
      maxDiffPixelRatio: 0.02,
    });
  });
}
