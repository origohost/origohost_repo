import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminPersonalSecurityPage from "@/frontend/pages/admin/personal/security";

export const Route = createFileRoute("/admin/personal/security")({
  head: () =>
    buildSeo({
      title: "Admin — Security",
      description: "Manage Security",
      path: "/admin/personal/security",
      noindex: true,
    }),
  component: AdminPersonalSecurityPage,
});
