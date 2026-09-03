import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminAnalyticsRetentionPage from "@/frontend/pages/admin/analytics/retention";

export const Route = createFileRoute("/admin/analytics/retention")({
  head: () =>
    buildSeo({
      title: "Admin — Retention",
      description: "Manage Retention",
      path: "/admin/analytics/retention",
      noindex: true,
    }),
  component: AdminAnalyticsRetentionPage,
});
