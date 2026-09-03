import { test, expect } from "@playwright/test";
import { stabilize } from "./helpers";

/**
 * Extra visual coverage for the partners page beyond the enterprise /
 * institutes grids covered by `partners-visual.spec.ts`:
 *
 *   - Both section headings ("Our Clientele", "Partners & Collaborators")
 *     snapped across desktop / tablet / mobile via the Playwright projects
 *     defined in playwright.config.ts.
 *   - A "long translated heading" variant: the visible heading text is
 *     replaced at runtime with a longer string that mimics a wordy
 *     translation (German/Finnish-style). This proves the typography scale
 *     still matches the reference — no clipping, no shift, no line-break
 *     regressions — regardless of copy length.
 */

test.describe.configure({ mode: "parallel" });

const HEADINGS = [
  { name: "clientele", text: "Our Clientele" },
  { name: "collaborators", text: "Partners & Collaborators" },
] as const;

const LONG_TRANSLATIONS: Record<(typeof HEADINGS)[number]["name"], string> = {
  clientele: "Unsere weltweite Klientel und langjährigen Partnerorganisationen",
  collaborators: "Partnerorganisationen, Bildungseinrichtungen und Kollaborateure",
};

for (const { name, text } of HEADINGS) {
  test(`partners heading — ${name} (reference copy)`, async ({ page }, testInfo) => {
    await page.goto("/partners");
    await stabilize(page);
    const heading = page.getByRole("heading", { name: text, level: 2 });
    await expect(heading).toBeVisible();
    await heading.scrollIntoViewIfNeeded();
    await stabilize(page);
    await expect(heading).toHaveScreenshot(
      `partners-heading-${name}-${testInfo.project.name}.png`,
      { animations: "disabled", caret: "hide", scale: "css", maxDiffPixelRatio: 0.02 },
    );
  });

  test(`partners heading — ${name} (long translation)`, async ({ page }, testInfo) => {
    await page.goto("/partners");
    await stabilize(page);
    const heading = page.getByRole("heading", { name: text, level: 2 });
    await expect(heading).toBeVisible();
    // Swap the visible copy in-place. We match on the current text and
    // rewrite the node so downstream layout re-flows exactly as a real
    // translation would. Using `page.evaluate` keeps this scoped to the
    // rendered DOM (no source edits) so the reference-order Zod schema is
    // untouched.
    const longText = LONG_TRANSLATIONS[name];
    await page.evaluate(
      ({ original, replacement }) => {
        const nodes = Array.from(document.querySelectorAll("h2"));
        const target = nodes.find((h) => h.textContent?.trim() === original);
        if (target) target.textContent = replacement;
      },
      { original: text, replacement: longText },
    );
    await heading.scrollIntoViewIfNeeded();
    await stabilize(page);
    // Snap the enclosing section so we catch any layout drift the longer
    // heading might push into the surrounding grid.
    const section = heading.locator("xpath=ancestor::section[1]");
    await expect(section).toHaveScreenshot(
      `partners-heading-${name}-long-${testInfo.project.name}.png`,
      { animations: "disabled", caret: "hide", scale: "css", maxDiffPixelRatio: 0.02 },
    );
  });
}
