import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminEventRegistrationsPage from "@/frontend/pages/admin/event-registrations";

export const Route = createFileRoute("/admin/event-registrations")({
  head: () =>
    buildSeo({
      title: "Admin — Event RSVPs",
      description: "Manage event attendees.",
      path: "/admin/event-registrations",
      noindex: true,
    }),
  component: AdminEventRegistrationsPage,
});
