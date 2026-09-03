import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminEventsVenuesPage from "@/frontend/pages/admin/events/venues";

export const Route = createFileRoute("/admin/events/venues")({
  head: () =>
    buildSeo({
      title: "Admin — Venues",
      description: "Manage Venues",
      path: "/admin/events/venues",
      noindex: true,
    }),
  component: AdminEventsVenuesPage,
});
