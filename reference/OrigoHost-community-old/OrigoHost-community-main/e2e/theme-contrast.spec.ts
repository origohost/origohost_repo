import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

/**
 * Focused WCAG AA color-contrast gate for the H2S palette.
 *
 * The full `axe-strict` spec already runs `color-contrast` across every
 * route, but that report is noisy and easy to skim past. This spec
 * isolates the two contrast rules on the highest-traffic surfaces so a
 * palette regression fails fast with a targeted error message.
 */

const SURFACES = [
  { route: "/", testid: "hero", label: "homepage hero + primary CTA" },
  { route: "/", testid: "what-we-do", label: "homepage feature cards" },
  { route: "/about", testid: "about-header", label: "about page header" },
] as const;

for (const { route, testid, label } of SURFACES) {
  test(`WCAG AA contrast: ${label}`, async ({ page }) => {
    await page.goto(route);
    await page.waitForLoadState("networkidle");

    const results = await new AxeBuilder({ page })
      .include(`[data-testid="${testid}"]`)
      .withRules(["color-contrast"])
      .analyze();

    if (results.violations.length) {
      const detail = results.violations
        .map(
          (v) =>
            `  [${v.impact}] ${v.id} — ${v.help} (${v.nodes.length} node(s))\n` +
            v.nodes
              .slice(0, 3)
              .map((n) => `    · ${n.target.join(" ")} — ${n.failureSummary?.split("\n")[0] ?? ""}`)
              .join("\n"),
        )
        .join("\n");
      throw new Error(
        `Contrast violation(s) on ${label}:\n${detail}\n` +
          `Adjust the token(s) in src/styles.css so foreground/background clear WCAG AA (4.5:1 body, 3:1 large).`,
      );
    }
    expect(results.violations).toEqual([]);
  });
}
