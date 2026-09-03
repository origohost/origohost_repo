import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminPersonalAppearancePage from "@/frontend/pages/admin/personal/appearance";

export const Route = createFileRoute("/admin/personal/appearance")({
  head: () =>
    buildSeo({
      title: "Admin — Appearance",
      description: "Manage Appearance",
      path: "/admin/personal/appearance",
      noindex: true,
    }),
  component: AdminPersonalAppearancePage,
});
