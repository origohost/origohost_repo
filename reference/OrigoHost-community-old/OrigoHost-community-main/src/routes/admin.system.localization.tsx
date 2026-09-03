import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminSystemLocalizationPage from "@/frontend/pages/admin/system/localization";

export const Route = createFileRoute("/admin/system/localization")({
  head: () =>
    buildSeo({
      title: "Admin — Localization",
      description: "Manage Localization",
      path: "/admin/system/localization",
      noindex: true,
    }),
  component: AdminSystemLocalizationPage,
});
