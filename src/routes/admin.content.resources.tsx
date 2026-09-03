import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminContentResourcesPage from "@/frontend/pages/admin/content/resources";

export const Route = createFileRoute("/admin/content/resources")({
  head: () =>
    buildSeo({
      title: "Admin — Resources",
      description: "Manage Resources",
      path: "/admin/content/resources",
      noindex: true,
    }),
  component: AdminContentResourcesPage,
});
