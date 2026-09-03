import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminAnalyticsOrganizationsPage from "@/frontend/pages/admin/analytics/organizations";

export const Route = createFileRoute("/admin/analytics/organizations")({
  head: () =>
    buildSeo({
      title: "Admin — Organizations",
      description: "Manage Organizations",
      path: "/admin/analytics/organizations",
      noindex: true,
    }),
  component: AdminAnalyticsOrganizationsPage,
});
