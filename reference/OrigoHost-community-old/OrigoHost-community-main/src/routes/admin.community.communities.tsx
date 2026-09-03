import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminCommunityCommunitiesPage from "@/frontend/pages/admin/community/communities";

export const Route = createFileRoute("/admin/community/communities")({
  head: () =>
    buildSeo({
      title: "Admin — Communities",
      description: "Manage Communities",
      path: "/admin/community/communities",
      noindex: true,
    }),
  component: AdminCommunityCommunitiesPage,
});
