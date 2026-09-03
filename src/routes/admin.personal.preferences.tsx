import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminPersonalPreferencesPage from "@/frontend/pages/admin/personal/preferences";

export const Route = createFileRoute("/admin/personal/preferences")({
  head: () =>
    buildSeo({
      title: "Admin — Preferences",
      description: "Manage Preferences",
      path: "/admin/personal/preferences",
      noindex: true,
    }),
  component: AdminPersonalPreferencesPage,
});
