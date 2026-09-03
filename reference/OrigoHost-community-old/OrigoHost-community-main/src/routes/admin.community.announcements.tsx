import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminCommunityAnnouncementsPage from "@/frontend/pages/admin/community/announcements";

export const Route = createFileRoute("/admin/community/announcements")({
  head: () =>
    buildSeo({
      title: "Admin — Announcements",
      description: "Manage Announcements",
      path: "/admin/community/announcements",
      noindex: true,
    }),
  component: AdminCommunityAnnouncementsPage,
});
