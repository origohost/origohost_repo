import type { ReactNode } from "react";
import { type QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/use-auth";
import { CookieConsentBanner, CookiePreferencesProvider } from "@/features/cookie-consent";

export function AppProviders({
  children,
  queryClient,
}: {
  children: ReactNode;
  queryClient: QueryClient;
}) {
  // Use localStorage for SSR compatibility. IndexedDB can cause hydration mismatch if not careful.
  const persister = createSyncStoragePersister({
    storage: typeof window !== "undefined" ? window.localStorage : undefined,
  });

  return (
    <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
      <ThemeProvider defaultTheme="system" storageKey="origohosts-theme">
        <TooltipProvider>
          <AuthProvider>
            <CookiePreferencesProvider>
              {children}
              <CookieConsentBanner />
              <Toaster richColors position="top-right" />
            </CookiePreferencesProvider>
          </AuthProvider>
        </TooltipProvider>
      </ThemeProvider>
    </PersistQueryClientProvider>
  );
}
