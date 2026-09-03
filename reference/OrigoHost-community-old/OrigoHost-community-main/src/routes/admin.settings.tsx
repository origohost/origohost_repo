import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminSettingsPage from "@/frontend/pages/admin/settings";

export const Route = createFileRoute("/admin/settings")({
  head: () =>
    buildSeo({
      title: "Admin — Settings",
      description: "Manage global platform settings.",
      path: "/admin/settings",
      noindex: true,
    }),
  component: AdminSettingsPage,
});
