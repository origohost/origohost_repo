import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminMarketingNotificationsPage from "@/frontend/pages/admin/marketing/notifications";

export const Route = createFileRoute("/admin/marketing/notifications")({
  head: () =>
    buildSeo({
      title: "Admin — Notifications",
      description: "Manage Notifications",
      path: "/admin/marketing/notifications",
      noindex: true,
    }),
  component: AdminMarketingNotificationsPage,
});
