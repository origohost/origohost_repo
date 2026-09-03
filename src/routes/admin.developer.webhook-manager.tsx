import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminDeveloperWebhookManagerPage from "@/frontend/pages/admin/developer/webhook-manager";

export const Route = createFileRoute("/admin/developer/webhook-manager")({
  head: () =>
    buildSeo({
      title: "Admin — Webhook Manager",
      description: "Manage Webhook Manager",
      path: "/admin/developer/webhook-manager",
      noindex: true,
    }),
  component: AdminDeveloperWebhookManagerPage,
});
