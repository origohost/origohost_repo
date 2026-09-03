import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminOperationsRegistrationManagementPage from "@/frontend/pages/admin/operations/registration-management";

export const Route = createFileRoute("/admin/operations/registration-management")({
  head: () =>
    buildSeo({
      title: "Admin — Registration Management",
      description: "Manage Registration Management",
      path: "/admin/operations/registration-management",
      noindex: true,
    }),
  component: AdminOperationsRegistrationManagementPage,
});
