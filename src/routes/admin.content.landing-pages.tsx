import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminContentLandingPagesPage from "@/frontend/pages/admin/content/landing-pages";

export const Route = createFileRoute("/admin/content/landing-pages")({
  head: () =>
    buildSeo({
      title: "Admin — Landing Pages",
      description: "Manage Landing Pages",
      path: "/admin/content/landing-pages",
      noindex: true,
    }),
  component: AdminContentLandingPagesPage,
});
