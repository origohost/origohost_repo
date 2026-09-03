import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminCommunityBadgesPage from "@/frontend/pages/admin/community/badges";

export const Route = createFileRoute("/admin/community/badges")({
  head: () =>
    buildSeo({
      title: "Admin — Badges",
      description: "Manage Badges",
      path: "/admin/community/badges",
      noindex: true,
    }),
  component: AdminCommunityBadgesPage,
});
