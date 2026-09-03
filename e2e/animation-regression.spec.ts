import { test, expect } from "@playwright/test";
import { PUBLIC_ROUTES } from "./routes";

/**
 * Basic mount + interaction sanity for every public route. Axe checks
 * live in axe-strict.spec.ts; motion budgets live in motion-budgets.spec.ts.
 */

const IGNORED_CONSOLE = /DevTools|Download the React DevTools|Warning: /;

for (const route of PUBLIC_ROUTES) {
  test(`${route} mounts without console errors`, async ({ page }) => {
    const errors: string[] = [];
    const pendingRequests = new Set<string>();

    page.on("request", (req) => pendingRequests.add(req.url()));
    page.on("requestfinished", (req) => pendingRequests.delete(req.url()));
    page.on("requestfailed", (req) => pendingRequests.delete(req.url()));

    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });
    page.on("pageerror", (e) => errors.push(e.message));

    await page.goto(route);

    // Set a timeout to log pending requests before it fails
    setTimeout(() => {
      console.log(`Pending requests for ${route}:`, Array.from(pendingRequests));
    }, 28000);

    await page.waitForLoadState("networkidle");
    const meaningful = errors.filter((e) => !IGNORED_CONSOLE.test(e));
    expect(meaningful, meaningful.join("\n")).toEqual([]);
  });
}

test("ScrollProgress bar grows as the user scrolls", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  const bar = page.locator('[aria-hidden][style*="scaleX"]').first();
  if ((await bar.count()) === 0) test.skip();
  const before = await bar.evaluate((el) => (el as HTMLElement).style.transform);
  await page.mouse.wheel(0, 2000);
  await page.waitForTimeout(400);
  const after = await bar.evaluate((el) => (el as HTMLElement).style.transform);
  expect(after).not.toBe(before);
});
