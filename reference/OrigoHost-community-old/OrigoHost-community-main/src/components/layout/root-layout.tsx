import type { ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";
import { PageTransition, ScrollProgress, CursorTrail } from "@/components/motion/primitives";
import { MobileBottomNav } from "./mobile-bottom-nav";

/**
 * Responsive global layout: sticky header, fluid main, footer.
 * Wraps every page rendered under the root route.
 */
export function RootLayout({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isAppShell =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/ambassador");

  const isAuthPage = pathname === "/login" || pathname === "/register";

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <CursorTrail />
      <ScrollProgress />
      {!isAppShell && <SiteHeader />}
      <main className="flex-1">
        <PageTransition pathname={pathname}>{children}</PageTransition>
      </main>
      {!isAppShell && !isAuthPage && <SiteFooter />}
      {!isAppShell && <MobileBottomNav />}
    </div>
  );
}
