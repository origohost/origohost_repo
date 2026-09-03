import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminSystemThemePage from "@/frontend/pages/admin/system/theme";

export const Route = createFileRoute("/admin/system/theme")({
  head: () =>
    buildSeo({
      title: "Admin — Theme",
      description: "Manage Theme",
      path: "/admin/system/theme",
      noindex: true,
    }),
  component: AdminSystemThemePage,
});
