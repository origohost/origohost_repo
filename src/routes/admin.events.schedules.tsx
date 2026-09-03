import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminEventsSchedulesPage from "@/frontend/pages/admin/events/schedules";

export const Route = createFileRoute("/admin/events/schedules")({
  head: () =>
    buildSeo({
      title: "Admin — Schedules",
      description: "Manage Schedules",
      path: "/admin/events/schedules",
      noindex: true,
    }),
  component: AdminEventsSchedulesPage,
});
