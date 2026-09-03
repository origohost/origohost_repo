/**
 * Unit tests for `PartnerLogo`.
 *
 * Covers the three fallback branches the component ships with:
 *   1. no `domain` on the entry → initials + a11y "logo unavailable" label
 *   2. missing publishable token → initials + "logo image disabled" label
 *      + a single dev-mode console.warn
 *   3. `<img loading="lazy" decoding="async">` fires `onError` at runtime → swaps to initials + "logo failed
 *      to load" label
 *
 * The Logo.dev token is captured at module load, so each branch reloads the
 * module under a mocked `import.meta.env`.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import type { PartnerLogoEntry } from "@/features/cms/types";

type PartnerLogoModule = typeof import("./partner-logo");

async function loadWithEnv(env: Record<string, string | undefined>) {
  vi.resetModules();
  // Merge onto Vite's runtime env so `import.meta.env.X` returns our value.
  for (const [k, v] of Object.entries(env)) {
    if (v === undefined) delete (import.meta.env as Record<string, unknown>)[k];
    else (import.meta.env as Record<string, unknown>)[k] = v;
  }
  return (await import("./partner-logo")) as PartnerLogoModule;
}

const ENTRY_WITH_DOMAIN: PartnerLogoEntry = { name: "Google", domain: "google.com" };
const ENTRY_NO_DOMAIN: PartnerLogoEntry = { name: "PCI" };

describe("PartnerLogo", () => {
  const originalEnv = { ...import.meta.env };

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    cleanup();
    // Restore env keys we may have mutated.
    (import.meta.env as Record<string, unknown>).VITE_LOVABLE_CONNECTOR_LOGO_DEV_API_KEY =
      originalEnv.VITE_LOVABLE_CONNECTOR_LOGO_DEV_API_KEY;
    (import.meta.env as Record<string, unknown>).VITE_LOGO_DEV_TOKEN = (
      originalEnv as Record<string, unknown>
    ).VITE_LOGO_DEV_TOKEN;
  });

  it("renders an <img> with a Logo.dev src + 2x srcSet when domain and token are present", async () => {
    const { PartnerLogo } = await loadWithEnv({
      VITE_LOVABLE_CONNECTOR_LOGO_DEV_API_KEY: "test_token_123",
      VITE_LOGO_DEV_TOKEN: undefined,
    });
    render(<PartnerLogo entry={ENTRY_WITH_DOMAIN} size={80} />);

    const img = screen.getByTestId("partner-logo-image") as HTMLImageElement;
    expect(img.src).toContain("https://img.logo.dev/google.com");
    expect(img.src).toContain("token=test_token_123");
    expect(img.src).toContain("size=80");
    expect(img.getAttribute("srcset")).toMatch(/1x.*2x/);
    expect(img).toHaveAttribute("loading", "lazy");
    expect(img).toHaveAttribute("decoding", "async");
    expect(img).toHaveAttribute("alt", "Google logo");
  });

  it("prefers the connector-managed token over VITE_LOGO_DEV_TOKEN", async () => {
    const { PartnerLogo } = await loadWithEnv({
      VITE_LOVABLE_CONNECTOR_LOGO_DEV_API_KEY: "managed_token",
      VITE_LOGO_DEV_TOKEN: "manual_token",
    });
    render(<PartnerLogo entry={ENTRY_WITH_DOMAIN} />);
    const img = screen.getByTestId("partner-logo-image") as HTMLImageElement;
    expect(img.src).toContain("token=managed_token");
    expect(img.src).not.toContain("manual_token");
  });

  it("falls back to VITE_LOGO_DEV_TOKEN when the connector key is absent", async () => {
    const { PartnerLogo } = await loadWithEnv({
      VITE_LOVABLE_CONNECTOR_LOGO_DEV_API_KEY: undefined,
      VITE_LOGO_DEV_TOKEN: "manual_token",
    });
    render(<PartnerLogo entry={ENTRY_WITH_DOMAIN} />);
    expect((screen.getByTestId("partner-logo-image") as HTMLImageElement).src).toContain(
      "token=manual_token",
    );
  });

  it("renders initials + 'logo unavailable' label when the entry has no domain", async () => {
    const { PartnerLogo } = await loadWithEnv({
      VITE_LOVABLE_CONNECTOR_LOGO_DEV_API_KEY: "test_token_123",
      VITE_LOGO_DEV_TOKEN: undefined,
    });
    render(<PartnerLogo entry={ENTRY_NO_DOMAIN} />);

    expect(screen.queryByTestId("partner-logo-image")).toBeNull();
    const fallback = screen.getByTestId("partner-logo-fallback");
    expect(fallback).toHaveTextContent("P"); // initials of "PCI" (first letter of the sole word)
    expect(fallback).toHaveAttribute("role", "img");
    expect(fallback).toHaveAttribute("aria-label", "PCI (logo unavailable)");
  });

  it("renders initials + 'logo image disabled' label and warns once when no token is configured", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const { PartnerLogo } = await loadWithEnv({
      VITE_LOVABLE_CONNECTOR_LOGO_DEV_API_KEY: undefined,
      VITE_LOGO_DEV_TOKEN: undefined,
    });
    render(
      <>
        <PartnerLogo entry={ENTRY_WITH_DOMAIN} />
        <PartnerLogo entry={{ name: "Meta", domain: "meta.com" }} />
        <PartnerLogo entry={{ name: "Adobe", domain: "adobe.com" }} />
      </>,
    );

    const fallbacks = screen.getAllByTestId("partner-logo-fallback");
    expect(fallbacks).toHaveLength(3);
    // Every fallback must be announced as an image role with a descriptive
    // aria-label explaining *why* text is showing (screen reader users need
    // to know this is a logo stand-in, not decorative text).
    for (const el of fallbacks) {
      expect(el).toHaveAttribute("role", "img");
    }
    expect(fallbacks[0]).toHaveAttribute("aria-label", "Google (logo image disabled)");
    expect(fallbacks[1]).toHaveAttribute("aria-label", "Meta (logo image disabled)");
    expect(fallbacks[2]).toHaveAttribute("aria-label", "Adobe (logo image disabled)");

    // Warning emitted at most once even when many tiles mount.
    expect(warn).toHaveBeenCalledTimes(1);
    expect(warn.mock.calls[0]?.[0]).toContain("[PartnerLogo]");
    expect(warn.mock.calls[0]?.[0]).toContain("VITE_LOGO_DEV_TOKEN");
  });

  it("swaps to initials + accessible 'logo failed to load' label when the <img> fires onError", async () => {
    const { PartnerLogo } = await loadWithEnv({
      VITE_LOVABLE_CONNECTOR_LOGO_DEV_API_KEY: "test_token_123",
      VITE_LOGO_DEV_TOKEN: undefined,
    });
    render(<PartnerLogo entry={ENTRY_WITH_DOMAIN} />);

    const img = screen.getByTestId("partner-logo-image");
    fireEvent.error(img);

    expect(screen.queryByTestId("partner-logo-image")).toBeNull();
    const fallback = screen.getByTestId("partner-logo-fallback");
    expect(fallback).toHaveTextContent("G"); // "Google" → single word → G
    // Screen-reader contract: the fallback is announced as an image with a
    // label that explains the state — not as generic text.
    expect(fallback).toHaveAttribute("role", "img");
    expect(fallback).toHaveAttribute("aria-label", "Google (logo failed to load)");
    // And the accessibility tree can find it by that role+name.
    expect(screen.getByRole("img", { name: "Google (logo failed to load)" })).toBe(fallback);
  });

  it("initialsFor produces stable, period-free initials for real partner names", async () => {
    const { initialsFor } = await loadWithEnv({
      VITE_LOVABLE_CONNECTOR_LOGO_DEV_API_KEY: "t",
      VITE_LOGO_DEV_TOKEN: undefined,
    });
    expect(initialsFor("Google")).toBe("G");
    expect(initialsFor("Amazon Alexa")).toBe("AA");
    expect(initialsFor("K.R. Mangalam University")).toBe("MU");
    expect(initialsFor("Larsen & Toubro")).toBe("LT");
    expect(initialsFor("PCI")).toBe("P");
    expect(initialsFor("Amazon Alexa")).not.toContain(".");
    expect(initialsFor("K.R. Mangalam University")).not.toContain(".");
  });
});
