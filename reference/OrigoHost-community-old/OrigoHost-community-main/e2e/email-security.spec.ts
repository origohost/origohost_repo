import { test, expect } from "@playwright/test";

// Use a shared rate-limited IP or handle rate limits by spacing out tests
test.describe("Email Security & Runtime Verification", () => {
  test("Contact Form loads successfully and handles valid submission", async ({
    page,
    request,
  }) => {
    await page.goto("/contact");
    await expect(
      page
        .locator("h1")
        .filter({ hasText: /Contact/i })
        .first(),
    ).toBeVisible();

    // Fill form
    await page.fill('input[name="name"]', "QA Test User <script>alert(1)</script>");
    await page.fill('input[name="email"]', "test-contact@example.com");
    await page.fill('textarea[name="message"]', 'Testing quotes " and symbols & < >');

    // Intercept API call to verify
    const responsePromise = page.waitForResponse(
      (response) => response.url().includes("/_server/") && response.request().method() === "POST",
    );

    await page.click('button[type="submit"]');

    const response = await responsePromise;
    expect(response.status()).toBe(200);

    const body = await response.json();
    // Assuming success response structure
    expect(body).toBeDefined();

    // Verify UI success state
    await expect(page.locator("text=Message sent successfully").first()).toBeVisible({
      timeout: 10000,
    });
  });

  test("Direct Server Action Abuse - Invalid Payload Rejection", async ({ request, baseURL }) => {
    // Send completely invalid data to submitApplicationFn
    const res = await request.post(
      `${baseURL}/_server/?serverFnId=submitApplicationFn&serverFnName=submitApplicationFn`,
      {
        data: {
          data: {
            malicious: "payload",
            to: "attacker@example.com",
            html: "<h1>hacked</h1>",
          },
        },
      },
    );

    // Should return 500 or 400 because Zod validation fails
    expect(res.status()).toBeGreaterThanOrEqual(400);
  });

  test("Rate Limiter Runtime Test", async ({ request, baseURL }) => {
    // We are permitted 5 requests per hour.
    // We'll spam the contact endpoint until we get a 429.
    let status429Received = false;

    for (let i = 0; i < 7; i++) {
      const res = await request.post(
        `${baseURL}/_server/?serverFnId=sendContactEmailFn&serverFnName=sendContactEmailFn`,
        {
          data: {
            data: {
              name: "Spammer",
              email: "spam@example.com",
              message: "spam",
            },
          },
          headers: {
            "X-Forwarded-For": "192.168.1.100", // Fake IP to not block the main test suite
          },
        },
      );

      if (res.status() === 429) {
        status429Received = true;
        const retryAfter = res.headers()["retry-after"];
        expect(retryAfter).toBeDefined();
        break;
      }
    }

    expect(status429Received).toBeTruthy();
  });
});
