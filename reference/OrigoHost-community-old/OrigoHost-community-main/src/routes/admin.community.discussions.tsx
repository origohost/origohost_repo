import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminCommunityDiscussionsPage from "@/frontend/pages/admin/community/discussions";

export const Route = createFileRoute("/admin/community/discussions")({
  head: () =>
    buildSeo({
      title: "Admin — Discussions",
      description: "Manage Discussions",
      path: "/admin/community/discussions",
      noindex: true,
    }),
  component: AdminCommunityDiscussionsPage,
});
