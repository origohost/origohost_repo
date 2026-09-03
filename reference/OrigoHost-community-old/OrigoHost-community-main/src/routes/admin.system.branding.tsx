import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminSystemBrandingPage from "@/frontend/pages/admin/system/branding";

export const Route = createFileRoute("/admin/system/branding")({
  head: () =>
    buildSeo({
      title: "Admin — Branding",
      description: "Manage Branding",
      path: "/admin/system/branding",
      noindex: true,
    }),
  component: AdminSystemBrandingPage,
});
