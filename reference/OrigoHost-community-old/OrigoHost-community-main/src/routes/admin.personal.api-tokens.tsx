import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminPersonalApiTokensPage from "@/frontend/pages/admin/personal/api-tokens";

export const Route = createFileRoute("/admin/personal/api-tokens")({
  head: () =>
    buildSeo({
      title: "Admin — API Tokens",
      description: "Manage API Tokens",
      path: "/admin/personal/api-tokens",
      noindex: true,
    }),
  component: AdminPersonalApiTokensPage,
});
