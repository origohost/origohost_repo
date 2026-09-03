import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminSeoPage from "@/frontend/pages/admin/seo";

export const Route = createFileRoute("/admin/seo")({
  head: () =>
    buildSeo({
      title: "Admin — SEO Manager",
      description: "Manage redirects and metadata.",
      path: "/admin/seo",
      noindex: true,
    }),
  component: AdminSeoPage,
});
