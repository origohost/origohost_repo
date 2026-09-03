import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminAnalyticsCountriesPage from "@/frontend/pages/admin/analytics/countries";

export const Route = createFileRoute("/admin/analytics/countries")({
  head: () =>
    buildSeo({
      title: "Admin — Countries",
      description: "Manage Countries",
      path: "/admin/analytics/countries",
      noindex: true,
    }),
  component: AdminAnalyticsCountriesPage,
});
