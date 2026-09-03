import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminContentFooterPage from "@/frontend/pages/admin/content/footer";

export const Route = createFileRoute("/admin/content/footer")({
  head: () =>
    buildSeo({
      title: "Admin — Footer",
      description: "Manage Footer",
      path: "/admin/content/footer",
      noindex: true,
    }),
  component: AdminContentFooterPage,
});
