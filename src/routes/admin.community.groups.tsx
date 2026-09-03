import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminCommunityGroupsPage from "@/frontend/pages/admin/community/groups";

export const Route = createFileRoute("/admin/community/groups")({
  head: () =>
    buildSeo({
      title: "Admin — Groups",
      description: "Manage Groups",
      path: "/admin/community/groups",
      noindex: true,
    }),
  component: AdminCommunityGroupsPage,
});
