import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminContentFormsBuilderPage from "@/frontend/pages/admin/content/forms-builder";

export const Route = createFileRoute("/admin/content/forms-builder")({
  head: () =>
    buildSeo({
      title: "Admin — Forms Builder",
      description: "Manage Forms Builder",
      path: "/admin/content/forms-builder",
      noindex: true,
    }),
  component: AdminContentFormsBuilderPage,
});
