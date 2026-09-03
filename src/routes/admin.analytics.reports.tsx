import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminAnalyticsReportsPage from "@/frontend/pages/admin/analytics/reports";

export const Route = createFileRoute("/admin/analytics/reports")({
  head: () =>
    buildSeo({
      title: "Admin — Reports",
      description: "Manage Reports",
      path: "/admin/analytics/reports",
      noindex: true,
    }),
  component: AdminAnalyticsReportsPage,
});
