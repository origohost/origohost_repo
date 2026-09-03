import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminDeveloperApiKeysPage from "@/frontend/pages/admin/developer/api-keys";

export const Route = createFileRoute("/admin/developer/api-keys")({
  head: () =>
    buildSeo({
      title: "Admin — API Keys",
      description: "Manage API Keys",
      path: "/admin/developer/api-keys",
      noindex: true,
    }),
  component: AdminDeveloperApiKeysPage,
});
