import { test, expect, type Page, type Route } from "@playwright/test";
import { stabilize } from "./helpers";

/**
 * Visual regression for partner-logo surfaces.
 *
 * Covered surfaces:
 *   - /partners "enterprise-grid" (Trusted-by grid)
 *   - /partners "institutes-grid"
 *   - /            "partners-marquee" (homepage marquee section)
 *
 * Each surface is snapshotted in two variants at every configured project
 * (desktop + mobile):
 *   - `real`     — every img.logo.dev request is fulfilled with a fixed
 *                  1×1 PNG, so the "image loaded" render path is exercised
 *                  without depending on the live Logo.dev CDN (which drifts
 *                  as brands re-upload assets).
 *   - `fallback` — every img.logo.dev request is aborted, forcing the
 *                  onError branch to render the initials tile for every
 *                  entry with a domain. Entries without a domain (e.g. PCI,
 *                  Awe) already render initials in both variants.
 *
 * The homepage marquee normally animates; `stabilize()` pauses all CSS
 * animations so the transform is deterministic when the snapshot is taken.
 */

test.describe.configure({ mode: "parallel" });

// 1×1 blue PNG — smallest possible deterministic payload so the "real logo"
// render is byte-stable across runs regardless of CDN behavior.
const STUB_PNG_B64 =
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
const STUB_PNG_BUFFER = Buffer.from(STUB_PNG_B64, "base64");

async function stubLogoDev(page: Page, mode: "real" | "fallback") {
  await page.route("**://img.logo.dev/**", (route: Route) => {
    if (mode === "fallback") return route.abort("failed");
    return route.fulfill({
      status: 200,
      contentType: "image/png",
      body: STUB_PNG_BUFFER,
    });
  });
}

const TARGETS = [
  { route: "/partners", testid: "enterprise-grid", name: "partners-enterprise" },
  { route: "/partners", testid: "institutes-grid", name: "partners-institutes" },
  { route: "/", testid: "partners-marquee", name: "home-partners-marquee" },
] as const;

for (const variant of ["real", "fallback"] as const) {
  for (const { route, testid, name } of TARGETS) {
    test(`visual: ${name} — ${variant}`, async ({ page }, testInfo) => {
      await stubLogoDev(page, variant);
      await page.goto(route);
      await stabilize(page);

      const region = page.getByTestId(testid);
      await expect(region).toBeVisible();
      // Scroll into view so lazy-loaded <img>s actually start loading
      // before we assert — matters for the "real" variant on long pages.
      await region.scrollIntoViewIfNeeded();
      await stabilize(page);

      await expect(region).toHaveScreenshot(`${name}-${variant}-${testInfo.project.name}.png`, {
        animations: "disabled",
        caret: "hide",
        scale: "css",
        maxDiffPixelRatio: 0.02,
      });
    });
  }
}
