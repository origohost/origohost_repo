import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminOperationsOrganizationsPage from "@/frontend/pages/admin/operations/organizations";

export const Route = createFileRoute("/admin/operations/organizations")({
  head: () =>
    buildSeo({
      title: "Admin — Organizations",
      description: "Manage Organizations",
      path: "/admin/operations/organizations",
      noindex: true,
    }),
  component: AdminOperationsOrganizationsPage,
});
