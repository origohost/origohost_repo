import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminCommunityCommunityAnalyticsPage from "@/frontend/pages/admin/community/community-analytics";

export const Route = createFileRoute("/admin/community/community-analytics")({
  head: () =>
    buildSeo({
      title: "Admin — Community Analytics",
      description: "Manage Community Analytics",
      path: "/admin/community/community-analytics",
      noindex: true,
    }),
  component: AdminCommunityCommunityAnalyticsPage,
});
