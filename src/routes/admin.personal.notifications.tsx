import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminPersonalNotificationsPage from "@/frontend/pages/admin/personal/notifications";

export const Route = createFileRoute("/admin/personal/notifications")({
  head: () =>
    buildSeo({
      title: "Admin — Notifications",
      description: "Manage Notifications",
      path: "/admin/personal/notifications",
      noindex: true,
    }),
  component: AdminPersonalNotificationsPage,
});
