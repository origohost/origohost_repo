import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminSystemSecurityPage from "@/frontend/pages/admin/system/security";

export const Route = createFileRoute("/admin/system/security")({
  head: () =>
    buildSeo({
      title: "Admin — Security",
      description: "Manage Security",
      path: "/admin/system/security",
      noindex: true,
    }),
  component: AdminSystemSecurityPage,
});
