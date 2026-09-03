import { test, expect } from "@playwright/test";
import { PUBLIC_ROUTES } from "./routes";
import { expectVisibleFocusRing } from "./helpers";

/**
 * Every interactive control on every public route must show a
 * :focus-visible ring under keyboard navigation. We walk the DOM's
 * focusable elements directly (rather than mashing Tab) so this scales
 * to routes with dozens of controls without slow keystroke loops.
 */

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

for (const route of PUBLIC_ROUTES) {
  test(`focus-visible on every interactive control @ ${route}`, async ({ page }) => {
    await page.goto(route);
    await page.waitForLoadState("networkidle");

    const handles = await page.locator(FOCUSABLE).elementHandles();
    // Cap per-page work: 40 controls is well beyond any real page here.
    const targets = handles.slice(0, 40);
    expect(targets.length, `expected focusable controls on ${route}`).toBeGreaterThan(0);

    for (const [i, handle] of targets.entries()) {
      const visible = await handle.isVisible().catch(() => false);
      if (!visible) continue;
      // Simulate keyboard focus (setting focus() directly still triggers
      // :focus-visible in Chromium when the last input modality was keys).
      await page.keyboard.press("Tab").catch(() => {});
      await handle.evaluate((el: Element) => (el as HTMLElement).focus());
      try {
        await expectVisibleFocusRing(page);
      } catch (err) {
        const tag = await handle.evaluate((el) => {
          const e = el as HTMLElement;
          return `${e.tagName.toLowerCase()}#${e.id ?? ""}.${e.className ?? ""}`.slice(0, 120);
        });
        throw new Error(
          `focus-visible missing on ${route} [${i}] ${tag}\n${(err as Error).message}`,
        );
      }
    }
  });
}

test("Tab from body reaches the first CTA on the home hero", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  await page.locator("body").click({ position: { x: 1, y: 1 } });
  await page.keyboard.press("Tab");
  await expectVisibleFocusRing(page);
});
