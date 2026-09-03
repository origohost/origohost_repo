import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminOperationsAdminsPage from "@/frontend/pages/admin/operations/admins";

export const Route = createFileRoute("/admin/operations/admins")({
  head: () =>
    buildSeo({
      title: "Admin — Admins",
      description: "Manage Admins",
      path: "/admin/operations/admins",
      noindex: true,
    }),
  component: AdminOperationsAdminsPage,
});
