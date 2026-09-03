import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminDeveloperActivityLogsPage from "@/frontend/pages/admin/developer/activity-logs";

export const Route = createFileRoute("/admin/developer/activity-logs")({
  head: () =>
    buildSeo({
      title: "Admin — Activity Logs",
      description: "Manage Activity Logs",
      path: "/admin/developer/activity-logs",
      noindex: true,
    }),
  component: AdminDeveloperActivityLogsPage,
});
