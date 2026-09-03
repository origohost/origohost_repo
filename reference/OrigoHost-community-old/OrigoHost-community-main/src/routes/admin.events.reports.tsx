import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminEventsReportsPage from "@/frontend/pages/admin/events/reports";

export const Route = createFileRoute("/admin/events/reports")({
  head: () =>
    buildSeo({
      title: "Admin — Reports",
      description: "Manage Reports",
      path: "/admin/events/reports",
      noindex: true,
    }),
  component: AdminEventsReportsPage,
});
