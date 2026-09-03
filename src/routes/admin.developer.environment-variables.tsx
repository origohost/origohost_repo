import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminDeveloperEnvironmentVariablesPage from "@/frontend/pages/admin/developer/environment-variables";

export const Route = createFileRoute("/admin/developer/environment-variables")({
  head: () =>
    buildSeo({
      title: "Admin — Environment Variables",
      description: "Manage Environment Variables",
      path: "/admin/developer/environment-variables",
      noindex: true,
    }),
  component: AdminDeveloperEnvironmentVariablesPage,
});
