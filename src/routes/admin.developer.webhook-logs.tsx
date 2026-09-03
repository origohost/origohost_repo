import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminDeveloperWebhookLogsPage from "@/frontend/pages/admin/developer/webhook-logs";

export const Route = createFileRoute("/admin/developer/webhook-logs")({
  head: () =>
    buildSeo({
      title: "Admin — Webhook Logs",
      description: "Manage Webhook Logs",
      path: "/admin/developer/webhook-logs",
      noindex: true,
    }),
  component: AdminDeveloperWebhookLogsPage,
});
