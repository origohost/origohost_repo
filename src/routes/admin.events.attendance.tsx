import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminEventsAttendancePage from "@/frontend/pages/admin/events/attendance";

export const Route = createFileRoute("/admin/events/attendance")({
  head: () =>
    buildSeo({
      title: "Admin — Attendance",
      description: "Manage Attendance",
      path: "/admin/events/attendance",
      noindex: true,
    }),
  component: AdminEventsAttendancePage,
});
