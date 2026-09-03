import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminMarketingSeoManagerPage from "@/frontend/pages/admin/marketing/seo-manager";

export const Route = createFileRoute("/admin/marketing/seo-manager")({
  head: () =>
    buildSeo({
      title: "Admin — SEO Manager",
      description: "Manage SEO Manager",
      path: "/admin/marketing/seo-manager",
      noindex: true,
    }),
  component: AdminMarketingSeoManagerPage,
});
