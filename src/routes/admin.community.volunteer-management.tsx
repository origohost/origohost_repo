import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminCommunityVolunteerManagementPage from "@/frontend/pages/admin/community/volunteer-management";

export const Route = createFileRoute("/admin/community/volunteer-management")({
  head: () =>
    buildSeo({
      title: "Admin — Volunteer Management",
      description: "Manage Volunteer Management",
      path: "/admin/community/volunteer-management",
      noindex: true,
    }),
  component: AdminCommunityVolunteerManagementPage,
});
