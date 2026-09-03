import { lazy, Suspense } from "react";
import { AnimatePresence, m as motion } from "framer-motion";
import { Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCookieConsent } from "./context";

// Lazy-load the preferences modal — it only ships to visitors who
// actually open it, keeping the initial bundle small.
const CookiePreferencesModal = lazy(() => import("./cookie-preferences-modal"));

/**
 * Bottom-anchored cookie consent banner. Renders only on the first
 * visit (status === "first-visit"). Uses framer-motion for the
 * fade/scale entrance and mounts the (lazy) preferences modal
 * whenever the visitor asks to customize.
 */
export function CookieConsentBanner() {
  const { isFirstVisit, isPreferencesOpen, openPreferences, handleAcceptAll, handleRejectAll } =
    useCookieConsent();

  return (
    <>
      <AnimatePresence>
        {isFirstVisit && (
          <motion.div
            key="cookie-banner"
            role="dialog"
            aria-live="polite"
            aria-labelledby="cookie-banner-title"
            aria-describedby="cookie-banner-desc"
            data-testid="cookie-consent-banner"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
            className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-3xl sm:inset-x-6 sm:bottom-6"
          >
            <div className="relative overflow-hidden rounded-3xl border border-foreground/10 bg-background/80 p-5 shadow-[0_30px_80px_-20px_oklch(0.22_0.08_265_/_0.35)] backdrop-blur-xl backdrop-saturate-150 sm:p-6 dark:bg-background/70">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
                <div
                  aria-hidden="true"
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-[var(--brand-orange)]/15 to-[oklch(0.65_0.22_260)]/15 text-[var(--brand-orange)]"
                >
                  <Cookie className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h2
                    id="cookie-banner-title"
                    className="text-base font-black tracking-tight text-foreground sm:text-lg"
                  >
                    <span aria-hidden="true">🍪 </span>We Value Your Privacy
                  </h2>
                  <p
                    id="cookie-banner-desc"
                    className="mt-1.5 text-sm leading-relaxed text-muted-foreground"
                  >
                    We use cookies and similar technologies to improve your browsing experience,
                    analyze website traffic, remember your preferences, and enhance our services.
                    You can choose which cookies to allow. Essential cookies are always enabled.
                  </p>

                  <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                    <Button
                      onClick={handleAcceptAll}
                      className="bg-gradient-to-r from-[var(--brand-orange)] to-[oklch(0.65_0.22_260)] text-white shadow-md transition-transform hover:-translate-y-0.5"
                    >
                      Accept All
                    </Button>
                    <Button variant="outline" onClick={handleRejectAll}>
                      Reject Non-Essential
                    </Button>
                    <Button variant="ghost" onClick={openPreferences}>
                      Customize Preferences
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isPreferencesOpen && (
        <Suspense fallback={null}>
          <CookiePreferencesModal />
        </Suspense>
      )}
    </>
  );
}
