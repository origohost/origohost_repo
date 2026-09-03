import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/600.css";
import "@fontsource/space-grotesk/700.css";

import type { QueryClient } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { AppProviders } from "@/providers/app-providers";
import { RootLayout } from "@/components/layout/root-layout";
import { LoadingScreen } from "@/components/layout/loading-screen";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { AnalyticsProvider } from "@/components/seo/AnalyticsProvider";
import { useAnalytics } from "@/hooks/use-analytics";
import { LazyMotion, domAnimation } from "framer-motion";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {}, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: "OrigoHOST Community" },
      {
        name: "description",
        content:
          "OrigoHOST Community — the enterprise hosting community for developers, teams, and operators.",
      },
      { name: "author", content: "OrigoHOST" },
      { name: "theme-color", content: "#ffffff" },
      { property: "og:title", content: "OrigoHOST Community" },
      {
        property: "og:description",
        content:
          "OrigoHOST Community — the enterprise hosting community for developers, teams, and operators.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "OrigoHOST Community" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "OrigoHOST Community" },
      {
        name: "twitter:description",
        content:
          "OrigoHOST Community — the enterprise hosting community for developers, teams, and operators.",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/png" },
      { rel: "apple-touch-icon", href: "/logo.png" },
      { rel: "preload", as: "image", href: "/logo.png", fetchPriority: "high" },
      { rel: "preconnect", href: "https://plausible.io", crossOrigin: "anonymous" },
      { rel: "dns-prefetch", href: "https://plausible.io" },
      { rel: "preconnect", href: "https://api.github.com", crossOrigin: "anonymous" },
      { rel: "dns-prefetch", href: "https://api.github.com" },
      {
        rel: "preconnect",
        href: "https://vtjxacmlmiatwpzyrifw.supabase.co",
        crossOrigin: "anonymous",
      },
      { rel: "dns-prefetch", href: "https://vtjxacmlmiatwpzyrifw.supabase.co" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  pendingComponent: () => (
    <div className="flex-1 mt-16">
      <LoadingScreen label="Loading route..." />
    </div>
  ),
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased selection:bg-primary/10 selection:text-primary overflow-x-hidden w-full max-w-[100vw] relative">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  useAnalytics();

  return (
    <AnalyticsProvider>
      <LazyMotion features={domAnimation}>
        <AppProviders queryClient={queryClient}>
          <RootLayout>
            {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
            <Outlet />
            <ScrollToTop />
          </RootLayout>
        </AppProviders>
      </LazyMotion>
    </AnalyticsProvider>
  );
}
