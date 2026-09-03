import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminEventsCategoriesPage from "@/frontend/pages/admin/events/categories";

export const Route = createFileRoute("/admin/events/categories")({
  head: () =>
    buildSeo({
      title: "Admin — Categories",
      description: "Manage Categories",
      path: "/admin/events/categories",
      noindex: true,
    }),
  component: AdminEventsCategoriesPage,
});
