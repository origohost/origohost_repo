import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminCommunityCommunityMembersPage from "@/frontend/pages/admin/community/community-members";

export const Route = createFileRoute("/admin/community/community-members")({
  head: () =>
    buildSeo({
      title: "Admin — Community Members",
      description: "Manage Community Members",
      path: "/admin/community/community-members",
      noindex: true,
    }),
  component: AdminCommunityCommunityMembersPage,
});
