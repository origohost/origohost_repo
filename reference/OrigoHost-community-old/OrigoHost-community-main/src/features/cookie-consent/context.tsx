import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  ACCEPT_ALL_PREFERENCES,
  CONSENT_VERSION,
  DEFAULT_PREFERENCES,
  type ConsentStatus,
  type CookiePreferences,
  type StoredConsent,
} from "./types";
import { clearConsent, loadConsent, saveConsent } from "./storage";

/**
 * CookiePreferencesContext
 *
 * Central store for the visitor's consent decision. All UI (banner,
 * modal, footer link) reads from and writes through this context.
 *
 * The four placeholder handlers exposed on the context — `handleAcceptAll`,
 * `handleRejectAll`, `handleSavePreferences`, `resetCookiePreferences` —
 * currently write to localStorage via ./storage. Replace the calls inside
 * ./storage.ts (not this file) when the backend is ready.
 *
 * ─────────────────────────────────────────────────────────────────────
 *  Where to fire analytics / marketing scripts
 * ─────────────────────────────────────────────────────────────────────
 *  Subscribe with `usePreferenceSubscription(({ preferences }) => …)`
 *  or read `preferences.analytics` / `preferences.marketing` in a
 *  dedicated loader component (e.g. `<AnalyticsLoader />`) and inject
 *  Google Analytics / Microsoft Clarity / PostHog / Meta Pixel etc.
 *  ONLY when the corresponding flag is `true`. See
 *  ./consent-effects.tsx for the canonical pattern.
 * ─────────────────────────────────────────────────────────────────────
 */

export interface CookieConsentContextValue {
  status: ConsentStatus;
  preferences: CookiePreferences;
  /** True when we have not yet loaded any persisted decision. */
  isLoading: boolean;
  /** True when the visitor has never made a decision. */
  isFirstVisit: boolean;
  /** True while the customize-preferences modal is open. */
  isPreferencesOpen: boolean;
  openPreferences: () => void;
  closePreferences: () => void;
  handleAcceptAll: () => void;
  handleRejectAll: () => void;
  handleSavePreferences: (next: CookiePreferences) => void;
  resetCookiePreferences: () => void;
}

const CookieConsentContext = createContext<CookieConsentContextValue | null>(null);

export function CookiePreferencesProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<ConsentStatus>("loading");
  const [preferences, setPreferences] = useState<CookiePreferences>(DEFAULT_PREFERENCES);
  const [isPreferencesOpen, setPreferencesOpen] = useState(false);

  // Hydrate from storage after mount — keeps SSR/CSR markup identical.
  // `loadConsent()` reads localStorage synchronously (via a wrapper) then
  // reconciles with the server; both paths update `status` exactly once.
  useEffect(() => {
    let cancelled = false;
    loadConsent()
      .then((stored) => {
        if (cancelled) return;
        if (stored) {
          setPreferences(stored.preferences);
          setStatus(stored.decision);
        } else {
          setStatus("first-visit");
        }
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const persist = useCallback((next: CookiePreferences, decision: StoredConsent["decision"]) => {
    const record: StoredConsent = {
      preferences: next,
      decision,
      decidedAt: new Date().toISOString(),
      version: CONSENT_VERSION,
    };
    saveConsent(record);
    setPreferences(next);
    setStatus(decision);
  }, []);

  const handleAcceptAll = useCallback(() => {
    persist(ACCEPT_ALL_PREFERENCES, "accepted");
    setPreferencesOpen(false);
  }, [persist]);

  const handleRejectAll = useCallback(() => {
    persist({ ...DEFAULT_PREFERENCES }, "rejected");
    setPreferencesOpen(false);
  }, [persist]);

  const handleSavePreferences = useCallback(
    (next: CookiePreferences) => {
      // Essential can never be disabled — enforce here defensively.
      persist({ ...next, essential: true }, "customized");
      setPreferencesOpen(false);
    },
    [persist],
  );

  const resetCookiePreferences = useCallback(() => {
    clearConsent();
    setPreferences(DEFAULT_PREFERENCES);
    setStatus("first-visit");
  }, []);

  const value = useMemo<CookieConsentContextValue>(
    () => ({
      status,
      preferences,
      isLoading: status === "loading",
      isFirstVisit: status === "first-visit",
      isPreferencesOpen,
      openPreferences: () => setPreferencesOpen(true),
      closePreferences: () => setPreferencesOpen(false),
      handleAcceptAll,
      handleRejectAll,
      handleSavePreferences,
      resetCookiePreferences,
    }),
    [
      status,
      preferences,
      isPreferencesOpen,
      handleAcceptAll,
      handleRejectAll,
      handleSavePreferences,
      resetCookiePreferences,
    ],
  );

  return <CookieConsentContext.Provider value={value}>{children}</CookieConsentContext.Provider>;
}

export function useCookieConsent(): CookieConsentContextValue {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) {
    throw new Error("useCookieConsent must be used inside <CookiePreferencesProvider>");
  }
  return ctx;
}
