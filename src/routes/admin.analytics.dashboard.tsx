import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminAnalyticsDashboardPage from "@/frontend/pages/admin/analytics/dashboard";

export const Route = createFileRoute("/admin/analytics/dashboard")({
  head: () =>
    buildSeo({
      title: "Admin — Dashboard",
      description: "Manage Dashboard",
      path: "/admin/analytics/dashboard",
      noindex: true,
    }),
  component: AdminAnalyticsDashboardPage,
});
