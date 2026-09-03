import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright config for animation, a11y, and reduced-motion regressions.
 * Boots the existing Vite dev server (port 8080) via `npm run dev`.
 */
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  timeout: 60000,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:8080",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  webServer: process.env.PLAYWRIGHT_BASE_URL
    ? undefined
    : {
        command: "npm run dev -- --port 8080",
        url: "http://localhost:8080",
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
      },
  projects: [
    {
      name: "desktop-chromium",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1280, height: 900 } },
      testIgnore: /(reduced-motion|animation-regression|keyboard-a11y)\.spec\.ts/,
    },
    {
      name: "mobile-chromium",
      use: { ...devices["Pixel 7"] },
      testIgnore: /(reduced-motion|animation-regression|keyboard-a11y)\.spec\.ts/,
    },
    {
      name: "tablet-chromium",
      use: { ...devices["iPad (gen 7)"], viewport: { width: 810, height: 1080 } },
      testIgnore: /(reduced-motion|animation-regression|keyboard-a11y)\.spec\.ts/,
    },
    {
      name: "reduced-motion",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1280, height: 900 },
        reducedMotion: "reduce",
      },
      testMatch: /(reduced-motion|animation-regression|keyboard-a11y)\.spec\.ts/,
    },
  ],
});
