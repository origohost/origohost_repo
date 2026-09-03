import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminContentCategoriesPage from "@/frontend/pages/admin/content/categories";

export const Route = createFileRoute("/admin/content/categories")({
  head: () =>
    buildSeo({
      title: "Admin — Categories",
      description: "Manage Categories",
      path: "/admin/content/categories",
      noindex: true,
    }),
  component: AdminContentCategoriesPage,
});
