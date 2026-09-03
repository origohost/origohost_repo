import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminAnalyticsFunnelsPage from "@/frontend/pages/admin/analytics/funnels";

export const Route = createFileRoute("/admin/analytics/funnels")({
  head: () =>
    buildSeo({
      title: "Admin — Funnels",
      description: "Manage Funnels",
      path: "/admin/analytics/funnels",
      noindex: true,
    }),
  component: AdminAnalyticsFunnelsPage,
});
