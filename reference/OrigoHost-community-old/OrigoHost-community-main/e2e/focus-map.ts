/**
 * Focusable-element map per public route. Each route lists the
 * high-signal controls that MUST be keyboard-reachable with a visible
 * :focus-visible ring. Add new landmarks here as pages evolve —
 * keeping the map small keeps CI runs fast while covering the
 * primary user journeys.
 *
 * Selectors are Playwright locators (CSS or `getByRole` syntax that
 * `page.locator` understands). Prefer accessible-name based selectors
 * (`[aria-label="..."]`, `text=Sign in`) so refactors don't break the
 * map.
 */

export interface FocusTarget {
  /** Playwright CSS selector or `text=...` locator. */
  selector: string;
  /** Human-readable label used in failure messages. */
  label: string;
}

export const FOCUS_MAP: Record<string, FocusTarget[]> = {
  "/": [
    { selector: 'header a[href="/"]', label: "brand home link" },
    { selector: 'header nav a[href="/events"]', label: "nav → events" },
    { selector: 'header nav a[href="/about"]', label: "nav → about" },
    { selector: 'a[href="/register"]', label: "primary CTA → register" },
  ],
  "/about": [{ selector: 'header a[href="/"]', label: "brand home link" }],
  "/blog": [{ selector: 'header a[href="/"]', label: "brand home link" }],
  "/contact": [
    { selector: 'input[type="email"], input[name="email"]', label: "email input" },
    { selector: "textarea", label: "message textarea" },
    { selector: 'button[type="submit"]', label: "submit button" },
  ],
  "/cookies": [{ selector: 'header a[href="/"]', label: "brand home link" }],
  "/events": [
    { selector: 'input[type="search"], input[placeholder*="Search" i]', label: "search input" },
  ],
  "/faq": [{ selector: 'header a[href="/"]', label: "brand home link" }],
  "/forgot-password": [
    { selector: 'input[type="email"]', label: "email input" },
    { selector: 'button[type="submit"]', label: "submit button" },
  ],
  "/gallery": [{ selector: 'header a[href="/"]', label: "brand home link" }],
  "/jobs": [{ selector: 'header a[href="/"]', label: "brand home link" }],
  "/login": [
    { selector: 'input[type="email"]', label: "email input" },
    { selector: 'input[type="password"]', label: "password input" },
    { selector: 'button[type="submit"]', label: "submit button" },
    { selector: 'a[href="/register"]', label: "→ register link" },
    { selector: 'a[href="/forgot-password"]', label: "→ forgot password link" },
  ],
  "/partners": [{ selector: 'header a[href="/"]', label: "brand home link" }],
  "/privacy": [{ selector: 'header a[href="/"]', label: "brand home link" }],
  "/refund": [{ selector: 'header a[href="/"]', label: "brand home link" }],
  "/register": [
    { selector: 'button[role="radio"]', label: "role picker radio" },
    { selector: "input#firstName", label: "first name input" },
    { selector: "input#lastName", label: "last name input" },
    { selector: 'input#email[type="email"]', label: "email input" },
    { selector: 'input#phone[type="tel"]', label: "phone input" },
    { selector: 'input#password[type="password"]', label: "password input" },
    { selector: 'button[type="submit"]', label: "create account button" },
    { selector: 'a[href="/login"]', label: "→ sign in link" },
  ],
  "/resources": [{ selector: 'header a[href="/"]', label: "brand home link" }],
  "/terms": [{ selector: 'header a[href="/"]', label: "brand home link" }],
};
