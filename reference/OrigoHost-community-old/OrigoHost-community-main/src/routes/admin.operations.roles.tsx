import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminOperationsRolesPage from "@/frontend/pages/admin/operations/roles";

export const Route = createFileRoute("/admin/operations/roles")({
  head: () =>
    buildSeo({
      title: "Admin — Roles",
      description: "Manage Roles",
      path: "/admin/operations/roles",
      noindex: true,
    }),
  component: AdminOperationsRolesPage,
});
