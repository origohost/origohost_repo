import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminAnalyticsTrafficPage from "@/frontend/pages/admin/analytics/traffic";

export const Route = createFileRoute("/admin/analytics/traffic")({
  head: () =>
    buildSeo({
      title: "Admin — Traffic",
      description: "Manage Traffic",
      path: "/admin/analytics/traffic",
      noindex: true,
    }),
  component: AdminAnalyticsTrafficPage,
});
