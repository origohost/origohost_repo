import { useEffect, useState } from "react";
import { m as motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useCookieConsent } from "./context";
import { CookieCategoryCard } from "./cookie-category-card";
import {
  ACCEPT_ALL_PREFERENCES,
  COOKIE_CATEGORIES,
  DEFAULT_PREFERENCES,
  type CookiePreferences,
} from "./types";

/**
 * Customize-preferences modal.
 *
 * Uses shadcn's Dialog primitive (Radix) which already provides:
 *  - focus trap
 *  - Escape / outside-click to dismiss
 *  - aria-labelledby / aria-describedby wiring
 *  - a `[data-slot=overlay]` backdrop we blur via className
 *
 * Loaded lazily from `<CookieConsentBanner />` so it never lands in
 * the initial JS bundle when the visitor has already consented.
 */
export default function CookiePreferencesModal() {
  const {
    isPreferencesOpen,
    closePreferences,
    preferences,
    handleAcceptAll,
    handleRejectAll,
    handleSavePreferences,
  } = useCookieConsent();

  const [draft, setDraft] = useState<CookiePreferences>(preferences);

  // Reset the local draft each time the modal opens so cancelled edits
  // never leak into a later session.
  useEffect(() => {
    if (isPreferencesOpen) setDraft(preferences);
  }, [isPreferencesOpen, preferences]);

  return (
    <Dialog
      open={isPreferencesOpen}
      onOpenChange={(next) => (next ? undefined : closePreferences())}
    >
      <DialogContent
        className="max-w-lg gap-0 overflow-hidden border-foreground/10 bg-background/95 p-0 backdrop-blur-xl sm:rounded-3xl"
        aria-describedby="cookie-preferences-desc"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.25, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <DialogHeader className="px-6 pt-6 text-left">
            <DialogTitle className="text-xl font-black tracking-tight">
              Customize cookie preferences
            </DialogTitle>
            <DialogDescription id="cookie-preferences-desc">
              Turn categories on or off. Essential cookies are always enabled because the site
              cannot function without them.
            </DialogDescription>
          </DialogHeader>

          <div className="max-h-[60vh] space-y-3 overflow-y-auto px-6 py-5">
            {COOKIE_CATEGORIES.map((category) => (
              <CookieCategoryCard
                key={category.id}
                category={category}
                checked={draft[category.id]}
                onChange={(checked) =>
                  setDraft((prev) => ({
                    ...prev,
                    [category.id]: category.alwaysOn ? true : checked,
                  }))
                }
              />
            ))}
          </div>

          <DialogFooter className="flex flex-col-reverse gap-2 border-t border-foreground/10 bg-foreground/[0.02] px-6 py-4 sm:flex-row sm:justify-between">
            <Button
              variant="ghost"
              onClick={() => {
                setDraft(DEFAULT_PREFERENCES);
                handleRejectAll();
              }}
            >
              Reject All
            </Button>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button
                variant="outline"
                onClick={() => {
                  setDraft(ACCEPT_ALL_PREFERENCES);
                  handleAcceptAll();
                }}
              >
                Accept All
              </Button>
              <Button
                onClick={() => handleSavePreferences(draft)}
                className="bg-gradient-to-r from-[var(--brand-orange)] to-[oklch(0.65_0.22_260)] text-white"
              >
                Save Preferences
              </Button>
            </div>
          </DialogFooter>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
