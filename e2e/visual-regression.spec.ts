import { test } from "@playwright/test";
import { VISUAL_ROUTES } from "./routes";
import { screenshotWithRetry } from "./helpers";

test.describe.configure({ mode: "parallel" });

/**
 * Visual regression for hero sections. Each snapshot goes through
 * `screenshotWithRetry` which stabilizes fonts, images, animations, and
 * date; on transient flake it re-freezes and retries once before
 * failing.
 */

for (const { path, name } of VISUAL_ROUTES) {
  test(`${name} snapshot`, async ({ page }, testInfo) => {
    await page.goto(path);
    await screenshotWithRetry(page, `${name}-${testInfo.project.name}.png`);
  });
}
