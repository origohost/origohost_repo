import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminEventsLivestreamPage from "@/frontend/pages/admin/events/livestream";

export const Route = createFileRoute("/admin/events/livestream")({
  head: () =>
    buildSeo({
      title: "Admin — Livestream",
      description: "Manage Livestream",
      path: "/admin/events/livestream",
      noindex: true,
    }),
  component: AdminEventsLivestreamPage,
});
