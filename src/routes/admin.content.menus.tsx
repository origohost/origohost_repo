import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminContentMenusPage from "@/frontend/pages/admin/content/menus";

export const Route = createFileRoute("/admin/content/menus")({
  head: () =>
    buildSeo({
      title: "Admin — Menus",
      description: "Manage Menus",
      path: "/admin/content/menus",
      noindex: true,
    }),
  component: AdminContentMenusPage,
});
