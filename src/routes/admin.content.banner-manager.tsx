import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminContentBannerManagerPage from "@/frontend/pages/admin/content/banner-manager";

export const Route = createFileRoute("/admin/content/banner-manager")({
  head: () =>
    buildSeo({
      title: "Admin — Banner Manager",
      description: "Manage Banner Manager",
      path: "/admin/content/banner-manager",
      noindex: true,
    }),
  component: AdminContentBannerManagerPage,
});
