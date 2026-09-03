import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminDeveloperDeploymentLogsPage from "@/frontend/pages/admin/developer/deployment-logs";

export const Route = createFileRoute("/admin/developer/deployment-logs")({
  head: () =>
    buildSeo({
      title: "Admin — Deployment Logs",
      description: "Manage Deployment Logs",
      path: "/admin/developer/deployment-logs",
      noindex: true,
    }),
  component: AdminDeveloperDeploymentLogsPage,
});
