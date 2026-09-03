import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminAnalyticsDevicesPage from "@/frontend/pages/admin/analytics/devices";

export const Route = createFileRoute("/admin/analytics/devices")({
  head: () =>
    buildSeo({
      title: "Admin — Devices",
      description: "Manage Devices",
      path: "/admin/analytics/devices",
      noindex: true,
    }),
  component: AdminAnalyticsDevicesPage,
});
