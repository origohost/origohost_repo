import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminAnalyticsBrowsersPage from "@/frontend/pages/admin/analytics/browsers";

export const Route = createFileRoute("/admin/analytics/browsers")({
  head: () =>
    buildSeo({
      title: "Admin — Browsers",
      description: "Manage Browsers",
      path: "/admin/analytics/browsers",
      noindex: true,
    }),
  component: AdminAnalyticsBrowsersPage,
});
