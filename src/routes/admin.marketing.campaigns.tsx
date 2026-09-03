import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminMarketingCampaignsPage from "@/frontend/pages/admin/marketing/campaigns";

export const Route = createFileRoute("/admin/marketing/campaigns")({
  head: () =>
    buildSeo({
      title: "Admin — Campaigns",
      description: "Manage Campaigns",
      path: "/admin/marketing/campaigns",
      noindex: true,
    }),
  component: AdminMarketingCampaignsPage,
});
