import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminEventsCalendarPage from "@/frontend/pages/admin/events/calendar";

export const Route = createFileRoute("/admin/events/calendar")({
  head: () =>
    buildSeo({
      title: "Admin — Calendar",
      description: "Manage Calendar",
      path: "/admin/events/calendar",
      noindex: true,
    }),
  component: AdminEventsCalendarPage,
});
