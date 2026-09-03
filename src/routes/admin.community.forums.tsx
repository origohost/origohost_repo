import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminCommunityForumsPage from "@/frontend/pages/admin/community/forums";

export const Route = createFileRoute("/admin/community/forums")({
  head: () =>
    buildSeo({
      title: "Admin — Forums",
      description: "Manage Forums",
      path: "/admin/community/forums",
      noindex: true,
    }),
  component: AdminCommunityForumsPage,
});
