import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminMarketingSocialPostsPage from "@/frontend/pages/admin/marketing/social-posts";

export const Route = createFileRoute("/admin/marketing/social-posts")({
  head: () =>
    buildSeo({
      title: "Admin — Social Posts",
      description: "Manage Social Posts",
      path: "/admin/marketing/social-posts",
      noindex: true,
    }),
  component: AdminMarketingSocialPostsPage,
});
