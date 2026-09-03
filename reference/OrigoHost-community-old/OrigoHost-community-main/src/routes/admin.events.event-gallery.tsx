import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminEventsEventGalleryPage from "@/frontend/pages/admin/events/event-gallery";

export const Route = createFileRoute("/admin/events/event-gallery")({
  head: () =>
    buildSeo({
      title: "Admin — Event Gallery",
      description: "Manage Event Gallery",
      path: "/admin/events/event-gallery",
      noindex: true,
    }),
  component: AdminEventsEventGalleryPage,
});
