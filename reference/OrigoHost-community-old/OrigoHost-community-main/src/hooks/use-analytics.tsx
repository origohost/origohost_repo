import { useEffect } from "react";
import { useLocation } from "@tanstack/react-router";
import { logPlatformVisit } from "@/actions/admin.dashboard";

export function useAnalytics() {
  const location = useLocation();

  useEffect(() => {
    // Basic user agent parsing for device type
    const ua = navigator.userAgent;
    let device_type: "Desktop" | "Mobile" | "Tablet" = "Desktop";

    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      device_type = "Tablet";
    } else if (
      /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
        ua,
      )
    ) {
      device_type = "Mobile";
    }

    // Skip analytics in development or testing environments
    if (import.meta.env.DEV || import.meta.env.VITE_PLAYWRIGHT) {
      return;
    }

    // Fire and forget, we don't need to await it
    logPlatformVisit({ data: { path: location.pathname, device_type } }).catch(() => {});
  }, [location.pathname]);
}
