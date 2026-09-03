/* eslint-disable @typescript-eslint/no-unused-expressions, prefer-rest-params */
import React, { useEffect } from "react";
import { useLocation } from "@tanstack/react-router";

// Environment variables (Vite syntax)
const POSTHOG_KEY = import.meta.env.VITE_POSTHOG_KEY || "";
const POSTHOG_HOST = import.meta.env.VITE_POSTHOG_HOST || "https://app.posthog.com";

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  useEffect(() => {
    // 1. Non-blocking PostHog Initialization - ONLY IF KEY EXISTS
    if (POSTHOG_KEY && typeof window !== "undefined" && !(window as any).posthog) {
      (function (t: any, e: any) {
        let o, n, p, r;
        e.__SV ||
          (((window as any).posthog = e),
          (e._i = []),
          (e.init = function (i: string, s: any, a: any) {
            function g(t: any, e: string) {
              const o = e.split(".");
              (2 == o.length && ((t = t[o[0]]), (e = o[1])),
                (t[e] = function () {
                  t.push([e].concat(Array.prototype.slice.call(arguments, 0)));
                }));
            }
            (((p = t.createElement("script")).type = "text/javascript"),
              (p.async = !0),
              (p.src =
                s.api_host.replace(".i.posthog.com", "-assets.i.posthog.com") + "/static/array.js"),
              (r = t.getElementsByTagName("script")[0]).parentNode.insertBefore(p, r));
            let u = e;
            for (
              void 0 !== a ? (u = e[a] = []) : (a = "posthog"),
                u.people = u.people || [],
                u.toString = function (t: string) {
                  let e = "posthog";
                  return ("posthog" !== a && (e += "." + a), t || (e += " (stub)"), e);
                },
                u.people.toString = function () {
                  return u.toString(1) + ".people (stub)";
                },
                o =
                  "capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys onSessionId".split(
                    " ",
                  ),
                n = 0;
              n < o.length;
              n++
            )
              g(u, o[n]);
            e._i.push([i, s, a]);
          }),
          (e.__SV = 1));
      })(document, (window as any).posthog || []);

      (window as any).posthog.init(POSTHOG_KEY, {
        api_host: POSTHOG_HOST,
        // Ensure this doesn't block the main thread or hurt Core Web Vitals
        loaded: function (ph: any) {
          if (import.meta.env.DEV) ph.opt_out_capturing(); // Don't pollute analytics in local dev
        },
      });
    }
  }, []);

  useEffect(() => {
    // 2. Track Route Changes Automatically - ONLY IF KEY EXISTS
    if (POSTHOG_KEY && typeof window !== "undefined" && (window as any).posthog) {
      (window as any).posthog.capture("$pageview", {
        $current_url: window.location.href,
        $pathname: location.pathname,
      });
    }
  }, [location.pathname]);

  return <>{children}</>;
}
