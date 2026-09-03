import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminBlogPage from "@/frontend/pages/admin/blog";

export const Route = createFileRoute("/admin/blog")({
  head: () =>
    buildSeo({
      title: "Admin — Blog",
      description: "Manage blog posts.",
      path: "/admin/blog",
      noindex: true,
    }),
  component: AdminBlogPage,
});
