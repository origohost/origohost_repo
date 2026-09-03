import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminNavigationPage from "@/frontend/pages/admin/navigation";

export const Route = createFileRoute("/admin/navigation")({
  head: () =>
    buildSeo({
      title: "Admin — Navigation",
      description: "Manage global navigation links.",
      path: "/admin/navigation",
      noindex: true,
    }),
  component: AdminNavigationPage,
});
