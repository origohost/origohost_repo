import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminOperationsVolunteersPage from "@/frontend/pages/admin/operations/volunteers";

export const Route = createFileRoute("/admin/operations/volunteers")({
  head: () =>
    buildSeo({
      title: "Admin — Volunteers",
      description: "Manage Volunteers",
      path: "/admin/operations/volunteers",
      noindex: true,
    }),
  component: AdminOperationsVolunteersPage,
});
