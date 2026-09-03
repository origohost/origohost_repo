import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminSystemIntegrationsPage from "@/frontend/pages/admin/system/integrations";

export const Route = createFileRoute("/admin/system/integrations")({
  head: () =>
    buildSeo({
      title: "Admin — Integrations",
      description: "Manage Integrations",
      path: "/admin/system/integrations",
      noindex: true,
    }),
  component: AdminSystemIntegrationsPage,
});
