import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminAnalyticsHeatmapsPage from "@/frontend/pages/admin/analytics/heatmaps";

export const Route = createFileRoute("/admin/analytics/heatmaps")({
  head: () =>
    buildSeo({
      title: "Admin — Heatmaps",
      description: "Manage Heatmaps",
      path: "/admin/analytics/heatmaps",
      noindex: true,
    }),
  component: AdminAnalyticsHeatmapsPage,
});
