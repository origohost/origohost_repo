import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminContentHomepagePage from "@/frontend/pages/admin/content/homepage";

export const Route = createFileRoute("/admin/content/homepage")({
  head: () =>
    buildSeo({
      title: "Admin — Homepage",
      description: "Manage Homepage",
      path: "/admin/content/homepage",
      noindex: true,
    }),
  component: AdminContentHomepagePage,
});
