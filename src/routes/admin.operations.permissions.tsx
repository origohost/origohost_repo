import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminOperationsPermissionsPage from "@/frontend/pages/admin/operations/permissions";

export const Route = createFileRoute("/admin/operations/permissions")({
  head: () =>
    buildSeo({
      title: "Admin — Permissions",
      description: "Manage Permissions",
      path: "/admin/operations/permissions",
      noindex: true,
    }),
  component: AdminOperationsPermissionsPage,
});
