import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminDeveloperApiExplorerPage from "@/frontend/pages/admin/developer/api-explorer";

export const Route = createFileRoute("/admin/developer/api-explorer")({
  head: () =>
    buildSeo({
      title: "Admin — API Explorer",
      description: "Manage API Explorer",
      path: "/admin/developer/api-explorer",
      noindex: true,
    }),
  component: AdminDeveloperApiExplorerPage,
});
