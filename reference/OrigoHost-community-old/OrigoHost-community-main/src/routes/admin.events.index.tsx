import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminEventsPage from "@/frontend/pages/admin/events";

export const Route = createFileRoute("/admin/events/")({
  head: () =>
    buildSeo({
      title: "Admin — Events",
      description: "Manage events.",
      path: "/admin/events",
      noindex: true,
    }),
  component: AdminEventsPage,
});
