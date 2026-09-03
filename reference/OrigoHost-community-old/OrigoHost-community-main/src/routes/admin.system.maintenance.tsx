import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminSystemMaintenancePage from "@/frontend/pages/admin/system/maintenance";

export const Route = createFileRoute("/admin/system/maintenance")({
  head: () =>
    buildSeo({
      title: "Admin — Maintenance",
      description: "Manage Maintenance",
      path: "/admin/system/maintenance",
      noindex: true,
    }),
  component: AdminSystemMaintenancePage,
});
