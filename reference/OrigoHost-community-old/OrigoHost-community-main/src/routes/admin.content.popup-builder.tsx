import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminContentPopupBuilderPage from "@/frontend/pages/admin/content/popup-builder";

export const Route = createFileRoute("/admin/content/popup-builder")({
  head: () =>
    buildSeo({
      title: "Admin — Popup Builder",
      description: "Manage Popup Builder",
      path: "/admin/content/popup-builder",
      noindex: true,
    }),
  component: AdminContentPopupBuilderPage,
});
