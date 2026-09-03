import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminDeveloperDeveloperToolsPage from "@/frontend/pages/admin/developer/developer-tools";

export const Route = createFileRoute("/admin/developer/developer-tools")({
  head: () =>
    buildSeo({
      title: "Admin — Developer Tools",
      description: "Manage Developer Tools",
      path: "/admin/developer/developer-tools",
      noindex: true,
    }),
  component: AdminDeveloperDeveloperToolsPage,
});
