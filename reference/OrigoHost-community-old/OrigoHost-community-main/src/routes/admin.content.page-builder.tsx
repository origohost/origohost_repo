import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminContentPageBuilderPage from "@/frontend/pages/admin/content/page-builder";

export const Route = createFileRoute("/admin/content/page-builder")({
  head: () =>
    buildSeo({
      title: "Admin — Page Builder",
      description: "Manage Page Builder",
      path: "/admin/content/page-builder",
      noindex: true,
    }),
  component: AdminContentPageBuilderPage,
});
