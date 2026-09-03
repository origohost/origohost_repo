import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminMarketingAnnouncementCenterPage from "@/frontend/pages/admin/marketing/announcement-center";

export const Route = createFileRoute("/admin/marketing/announcement-center")({
  head: () =>
    buildSeo({
      title: "Admin — Announcement Center",
      description: "Manage Announcement Center",
      path: "/admin/marketing/announcement-center",
      noindex: true,
    }),
  component: AdminMarketingAnnouncementCenterPage,
});
