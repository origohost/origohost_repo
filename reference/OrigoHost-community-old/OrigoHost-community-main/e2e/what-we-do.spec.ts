import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { stabilize } from "./helpers";

const SECTORS = [
  "Workshops & Training",
  "Hackathons & Challenges",
  "Community Events",
  "Brand & Campus Partnership",
] as const;

const VIEWPORTS = [
  { name: "mobile", width: 390, height: 844 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1280, height: 900 },
] as const;

test.describe('"What We Do" — sector stacking order + presence', () => {
  for (const vp of VIEWPORTS) {
    test(`all 4 sector headings render in order @${vp.name}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto("/");
      await stabilize(page);

      const section = page.locator('section:has-text("Learn, Build, Grow")').first();
      await section.scrollIntoViewIfNeeded();

      // The four sector headings must be present, in this exact order.
      const sectorHeadings = section.locator("h3", {
        hasText:
          /Workshops & Training|Hackathons & Challenges|Community Events|Brand & Campus Partnership/,
      });
      await expect(sectorHeadings).toHaveCount(SECTORS.length);
      const texts = (await sectorHeadings.allTextContents()).map((t) => t.trim());
      expect(texts, `sector stacking order @${vp.name}`).toEqual([...SECTORS]);

      // Each card must be visually stacked BELOW the previous one on mobile
      // (single column). On tablet+ the grid may put pairs on one row, so we
      // only assert monotonic non-decreasing Y coordinates.
      const boxes = await Promise.all(
        (await sectorHeadings.elementHandles()).map(async (h) => (await h.boundingBox())!),
      );
      for (let i = 1; i < boxes.length; i++) {
        expect(
          boxes[i].y,
          `sector "${SECTORS[i]}" must not render above "${SECTORS[i - 1]}" @${vp.name}`,
        ).toBeGreaterThanOrEqual(boxes[i - 1].y - 1);
      }
      if (vp.name === "mobile") {
        // On mobile the 4 cards + the "Have an idea?" card all stack — no two
        // sector headings share a Y row.
        for (let i = 1; i < boxes.length; i++) {
          expect(boxes[i].y, `sector cards must stack (single column) on mobile`).toBeGreaterThan(
            boxes[i - 1].y + 20,
          );
        }
      }
    });
  }
});

test.describe('"What We Do" — visual regression', () => {
  for (const vp of [
    { name: "desktop", width: 1280, height: 900 },
    { name: "mobile", width: 390, height: 844 },
  ] as const) {
    test(`grid snapshot @${vp.name}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto("/");
      await stabilize(page);

      const section = page.locator('section:has-text("Learn, Build, Grow")').first();
      await section.scrollIntoViewIfNeeded();
      await stabilize(page);

      await expect(section).toHaveScreenshot(`what-we-do-${vp.name}.png`, {
        animations: "disabled",
        caret: "hide",
        scale: "css",
        maxDiffPixelRatio: 0.02,
      });
    });
  }
});

test.describe("Founders + Events — axe a11y", () => {
  test("homepage events section has no serious/critical a11y violations", async ({ page }) => {
    await page.goto("/");
    await stabilize(page);

    const results = await new AxeBuilder({ page })
      .include('#events, section:has-text("Upcoming Events"), section:has-text("Events")')
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    const blocking = results.violations.filter(
      (v) => v.impact === "serious" || v.impact === "critical",
    );
    expect(
      blocking,
      `blocking a11y violations in events section:\n${JSON.stringify(blocking, null, 2)}`,
    ).toEqual([]);
  });

  test("about page founders section has no serious/critical a11y violations", async ({ page }) => {
    await page.goto("/about");
    await stabilize(page);

    // Scope to the founders/leadership region on /about — fall back to <main>
    // so the test still runs if the section id changes.
    const results = await new AxeBuilder({ page })
      .include("main")
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    const blocking = results.violations.filter(
      (v) => v.impact === "serious" || v.impact === "critical",
    );
    expect(
      blocking,
      `blocking a11y violations on /about:\n${JSON.stringify(blocking, null, 2)}`,
    ).toEqual([]);
  });
});
