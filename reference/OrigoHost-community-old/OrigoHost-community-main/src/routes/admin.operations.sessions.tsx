import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminOperationsSessionsPage from "@/frontend/pages/admin/operations/sessions";

export const Route = createFileRoute("/admin/operations/sessions")({
  head: () =>
    buildSeo({
      title: "Admin — Sessions",
      description: "Manage Sessions",
      path: "/admin/operations/sessions",
      noindex: true,
    }),
  component: AdminOperationsSessionsPage,
});
