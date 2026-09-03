import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminDeveloperErrorLogsPage from "@/frontend/pages/admin/developer/error-logs";

export const Route = createFileRoute("/admin/developer/error-logs")({
  head: () =>
    buildSeo({
      title: "Admin — Error Logs",
      description: "Manage Error Logs",
      path: "/admin/developer/error-logs",
      noindex: true,
    }),
  component: AdminDeveloperErrorLogsPage,
});
