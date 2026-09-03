import { test, expect } from "@playwright/test";

/**
 * Visual regression for the sticky glass site header on first paint,
 * in both light and dark mode. We snapshot the <header> element only
 * (not the full page) so page content changes don't invalidate the
 * baseline. Runs with reduced-motion forced so the tilt transform,
 * page-transition fade, and hover animations don't flake the diff.
 */
test.describe("SiteHeader — initial paint visual regression", () => {
  test.use({ reducedMotion: "reduce" });

  for (const theme of ["light", "dark"] as const) {
    test(`header on first paint — ${theme} mode`, async ({ page }) => {
      // Pre-seed the theme so first paint already renders in the target
      // colour scheme (avoids a flash of the wrong theme in the snapshot).
      await page.addInitScript((mode) => {
        try {
          window.localStorage.setItem("theme", mode);
        } catch {
          /* storage may be blocked — safe to ignore for the snapshot */
        }
      }, theme);
      await page.emulateMedia({ colorScheme: theme });

      await page.goto("/", { waitUntil: "domcontentloaded" });

      // Ensure the theme class is applied before we snap, without waiting
      // on network-heavy resources.
      if (theme === "dark") {
        await page.evaluate(() => document.documentElement.classList.add("dark"));
      } else {
        await page.evaluate(() => document.documentElement.classList.remove("dark"));
      }

      const header = page.locator("header").first();
      await expect(header).toBeVisible();
      await expect(header).toHaveScreenshot(`site-header-${theme}.png`, {
        animations: "disabled",
        maxDiffPixelRatio: 0.02,
      });
    });
  }
});
