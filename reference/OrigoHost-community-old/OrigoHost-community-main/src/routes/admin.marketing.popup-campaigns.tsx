import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminMarketingPopupCampaignsPage from "@/frontend/pages/admin/marketing/popup-campaigns";

export const Route = createFileRoute("/admin/marketing/popup-campaigns")({
  head: () =>
    buildSeo({
      title: "Admin — Popup Campaigns",
      description: "Manage Popup Campaigns",
      path: "/admin/marketing/popup-campaigns",
      noindex: true,
    }),
  component: AdminMarketingPopupCampaignsPage,
});
