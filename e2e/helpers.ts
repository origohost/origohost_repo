import { expect, type Page } from "@playwright/test";

/**
 * Wait for the page to be visually deterministic: fonts loaded, network
 * idle, images decoded, animations disabled. Call before every
 * `toHaveScreenshot` to keep CI snapshots stable.
 */
export async function stabilize(page: Page) {
  await page.waitForLoadState("networkidle");

  // Force a deterministic date/time so any "now"-derived UI is stable.
  await page.addInitScript(() => {
    const FROZEN = new Date("2026-01-15T12:00:00Z").getTime();
    const OriginalDate = Date;
    // @ts-expect-error – runtime shim
    globalThis.Date = class extends OriginalDate {
      constructor(...args: unknown[]) {
        // @ts-expect-error – spread through
        super(...(args.length ? args : [FROZEN]));
      }
      static now() {
        return FROZEN;
      }
    };
  });

  // Kill every keyframe/transition + caret blink for the snapshot.
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation-duration: 0s !important;
        animation-delay: -0.0001s !important;
        animation-iteration-count: 1 !important;
        animation-play-state: paused !important;
        transition-duration: 0s !important;
        transition-delay: 0s !important;
        caret-color: transparent !important;
      }
      html { scroll-behavior: auto !important; }
    `,
  });

  // Wait for fonts, then for images to finish decoding.
  await page.evaluate(async () => {
    if (document.fonts && document.fonts.ready) await document.fonts.ready;
    const imgs = Array.from(document.images).filter((i) => !i.complete);
    await Promise.all(
      imgs.map(
        (img) =>
          new Promise<void>((res) => {
            img.addEventListener("load", () => res(), { once: true });
            img.addEventListener("error", () => res(), { once: true });
          }),
      ),
    );
  });

  // Two rAF ticks to flush layout/paint of the injected styles.
  await page.evaluate(
    () =>
      new Promise<void>((res) => requestAnimationFrame(() => requestAnimationFrame(() => res()))),
  );
}

/**
 * Assert the currently focused element has a visible :focus-visible ring
 * — outline OR box-shadow, on the element or its ::before/::after.
 */
export async function expectVisibleFocusRing(page: Page) {
  const focused = page.locator(":focus-visible");
  await expect(focused, "expected exactly one :focus-visible element").toHaveCount(1);
  const visible = await focused.evaluate((el) => {
    function ringOn(target: Element, pseudo?: string) {
      const s = getComputedStyle(target, pseudo);
      const outlineOk = s.outlineStyle !== "none" && parseFloat(s.outlineWidth) > 0;
      const shadowOk = s.boxShadow !== "none" && s.boxShadow.trim().length > 0;
      return outlineOk || shadowOk;
    }
    return ringOn(el) || ringOn(el, "::before") || ringOn(el, "::after");
  });
  expect(visible, "focused element must show a :focus-visible ring").toBe(true);
}

/**
 * Freeze the page and take a screenshot with one automatic retry to
 * absorb transient flake from fonts, images, or late layout shifts.
 * On the first failure we re-stabilize, wait a short beat, and try
 * again. A second failure surfaces normally.
 */
export async function screenshotWithRetry(
  page: Page,
  name: string,
  options: Parameters<ReturnType<typeof expect<Page>>["toHaveScreenshot"]>[1] = {},
) {
  await stabilize(page);
  try {
    await expect(page).toHaveScreenshot(name, {
      animations: "disabled",
      caret: "hide",
      scale: "css",
      maxDiffPixelRatio: 0.02,
      ...options,
    });
  } catch (firstErr) {
    // Deterministic retry: re-freeze fonts/images, settle another 2 rAF
    // ticks, then retry once. Anything still failing is a real regression.
    await page.waitForTimeout(500);
    await stabilize(page);
    try {
      await expect(page).toHaveScreenshot(name, {
        animations: "disabled",
        caret: "hide",
        scale: "css",
        maxDiffPixelRatio: 0.02,
        ...options,
      });
    } catch (secondErr) {
      throw new Error(
        `Visual regression for "${name}" failed twice:\n${(secondErr as Error).message}\n(first attempt: ${(firstErr as Error).message.split("\n")[0]})`,
      );
    }
  }
}
