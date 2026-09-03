/**
 * Cookie consent domain types.
 *
 * Categories are intentionally narrow so the same shape can be persisted
 * to localStorage today and to Supabase / a server endpoint tomorrow.
 */

export type CookieCategoryId = "essential" | "functional" | "analytics" | "marketing";

export interface CookiePreferences {
  essential: true; // always on — cannot be disabled
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
}

export type ConsentDecision = "accepted" | "rejected" | "customized";

export interface StoredConsent {
  preferences: CookiePreferences;
  decision: ConsentDecision;
  /** ISO timestamp of the decision. */
  decidedAt: string;
  /** Schema version, bump to force re-consent after material policy changes. */
  version: number;
}

export type ConsentStatus =
  "loading" | "first-visit" | "accepted" | "rejected" | "customized" | "error";

export interface CookieCategoryMeta {
  id: CookieCategoryId;
  title: string;
  description: string;
  alwaysOn?: boolean;
}

export const COOKIE_CATEGORIES: CookieCategoryMeta[] = [
  {
    id: "essential",
    title: "Essential Cookies",
    description:
      "Required for login, security, session management, and core website functionality.",
    alwaysOn: true,
  },
  {
    id: "functional",
    title: "Functional Cookies",
    description: "Remember your preferences such as theme, language, and personalized settings.",
  },
  {
    id: "analytics",
    title: "Analytics Cookies",
    description: "Help us understand how visitors use our website through anonymous analytics.",
  },
  {
    id: "marketing",
    title: "Marketing Cookies",
    description:
      "Used to deliver relevant advertisements and measure marketing campaign performance.",
  },
];

export const CONSENT_VERSION = 1;

export const DEFAULT_PREFERENCES: CookiePreferences = {
  essential: true,
  functional: false,
  analytics: false,
  marketing: false,
};

export const ACCEPT_ALL_PREFERENCES: CookiePreferences = {
  essential: true,
  functional: true,
  analytics: true,
  marketing: true,
};
