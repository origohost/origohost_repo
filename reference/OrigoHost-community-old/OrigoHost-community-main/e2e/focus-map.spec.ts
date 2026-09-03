import { test, expect } from "@playwright/test";
import { FOCUS_MAP } from "./focus-map";
import { expectVisibleFocusRing } from "./helpers";

/**
 * Focus map assertion: for every mapped element on every route, focus
 * it via keyboard and confirm it shows a visible :focus-visible ring.
 * Runs on desktop-chromium AND mobile-chromium (mobile browsers still
 * expose tab-focus behavior when triggered programmatically), so a
 * component regressing on either viewport surfaces in CI.
 */

for (const [route, targets] of Object.entries(FOCUS_MAP)) {
  test(`focus-map @ ${route}`, async ({ page }) => {
    await page.goto(route);
    await page.waitForLoadState("networkidle");

    for (const { selector, label } of targets) {
      const el = page.locator(selector).first();
      if ((await el.count()) === 0) {
        throw new Error(`focus-map: missing "${label}" (${selector}) on ${route}`);
      }
      // Simulate keyboard-mode focus so :focus-visible activates.
      await page.keyboard.press("Tab").catch(() => {});
      await el.evaluate((n) => (n as HTMLElement).focus({ preventScroll: false }));
      try {
        await expectVisibleFocusRing(page);
      } catch (err) {
        throw new Error(
          `focus-map: "${label}" (${selector}) on ${route} has no visible :focus-visible ring.\n${(err as Error).message}`,
        );
      }
      expect(await el.evaluate((n) => n === document.activeElement)).toBe(true);
    }
  });
}
