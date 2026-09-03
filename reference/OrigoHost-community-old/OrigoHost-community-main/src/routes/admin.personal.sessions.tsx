import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminPersonalSessionsPage from "@/frontend/pages/admin/personal/sessions";

export const Route = createFileRoute("/admin/personal/sessions")({
  head: () =>
    buildSeo({
      title: "Admin — Sessions",
      description: "Manage Sessions",
      path: "/admin/personal/sessions",
      noindex: true,
    }),
  component: AdminPersonalSessionsPage,
});
