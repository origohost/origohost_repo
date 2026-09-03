import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminEventsFeedbackPage from "@/frontend/pages/admin/events/feedback";

export const Route = createFileRoute("/admin/events/feedback")({
  head: () =>
    buildSeo({
      title: "Admin — Feedback",
      description: "Manage Feedback",
      path: "/admin/events/feedback",
      noindex: true,
    }),
  component: AdminEventsFeedbackPage,
});
