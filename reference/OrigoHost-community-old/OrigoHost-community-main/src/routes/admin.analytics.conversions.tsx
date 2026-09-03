import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminAnalyticsConversionsPage from "@/frontend/pages/admin/analytics/conversions";

export const Route = createFileRoute("/admin/analytics/conversions")({
  head: () =>
    buildSeo({
      title: "Admin — Conversions",
      description: "Manage Conversions",
      path: "/admin/analytics/conversions",
      noindex: true,
    }),
  component: AdminAnalyticsConversionsPage,
});
