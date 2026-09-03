import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminEventsReviewsPage from "@/frontend/pages/admin/events/reviews";

export const Route = createFileRoute("/admin/events/reviews")({
  head: () =>
    buildSeo({
      title: "Admin — Reviews",
      description: "Manage Reviews",
      path: "/admin/events/reviews",
      noindex: true,
    }),
  component: AdminEventsReviewsPage,
});
