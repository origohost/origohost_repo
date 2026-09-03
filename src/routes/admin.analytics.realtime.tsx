import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminAnalyticsRealtimePage from "@/frontend/pages/admin/analytics/realtime";

export const Route = createFileRoute("/admin/analytics/realtime")({
  head: () =>
    buildSeo({
      title: "Admin — Realtime",
      description: "Manage Realtime",
      path: "/admin/analytics/realtime",
      noindex: true,
    }),
  component: AdminAnalyticsRealtimePage,
});
