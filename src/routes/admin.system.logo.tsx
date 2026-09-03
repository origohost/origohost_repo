import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminSystemLogoPage from "@/frontend/pages/admin/system/logo";

export const Route = createFileRoute("/admin/system/logo")({
  head: () =>
    buildSeo({
      title: "Admin — Logo",
      description: "Manage Logo",
      path: "/admin/system/logo",
      noindex: true,
    }),
  component: AdminSystemLogoPage,
});
