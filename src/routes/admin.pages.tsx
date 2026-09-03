import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminPagesPage from "@/frontend/pages/admin/pages";

export const Route = createFileRoute("/admin/pages")({
  head: () =>
    buildSeo({
      title: "Admin — Pages",
      description: "Manage page metadata.",
      path: "/admin/pages",
      noindex: true,
    }),
  component: AdminPagesPage,
});
