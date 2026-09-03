import { lazy, Suspense, type ReactNode } from "react";
import { useCookieConsent } from "./context";

// Reuse the same lazy chunk as the banner.
const CookiePreferencesModal = lazy(() => import("./cookie-preferences-modal"));

/**
 * `CookiePreferencesButton`
 *
 * Drop anywhere in the app (footer, settings page, etc.) to let a
 * visitor re-open the preferences modal after their initial decision.
 * Renders as a native <button> by default; pass `className` / children
 * to match the host surface.
 */
export interface CookiePreferencesButtonProps {
  className?: string;
  children?: ReactNode;
}

export function CookiePreferencesButton({
  className,
  children = "Cookie Preferences",
}: CookiePreferencesButtonProps) {
  const { openPreferences, isPreferencesOpen } = useCookieConsent();
  return (
    <>
      <button
        type="button"
        onClick={openPreferences}
        className={
          className ??
          "text-sm text-white/60 underline-offset-4 transition-colors hover:text-white hover:underline"
        }
      >
        {children}
      </button>
      {isPreferencesOpen && (
        <Suspense fallback={null}>
          <CookiePreferencesModal />
        </Suspense>
      )}
    </>
  );
}
