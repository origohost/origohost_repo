import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminAnalyticsCitiesPage from "@/frontend/pages/admin/analytics/cities";

export const Route = createFileRoute("/admin/analytics/cities")({
  head: () =>
    buildSeo({
      title: "Admin — Cities",
      description: "Manage Cities",
      path: "/admin/analytics/cities",
      noindex: true,
    }),
  component: AdminAnalyticsCitiesPage,
});
