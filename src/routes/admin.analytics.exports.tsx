import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminAnalyticsExportsPage from "@/frontend/pages/admin/analytics/exports";

export const Route = createFileRoute("/admin/analytics/exports")({
  head: () =>
    buildSeo({
      title: "Admin — Exports",
      description: "Manage Exports",
      path: "/admin/analytics/exports",
      noindex: true,
    }),
  component: AdminAnalyticsExportsPage,
});
