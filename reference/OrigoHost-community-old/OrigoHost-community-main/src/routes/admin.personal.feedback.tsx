import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminPersonalFeedbackPage from "@/frontend/pages/admin/personal/feedback";

export const Route = createFileRoute("/admin/personal/feedback")({
  head: () =>
    buildSeo({
      title: "Admin — Feedback",
      description: "Manage Feedback",
      path: "/admin/personal/feedback",
      noindex: true,
    }),
  component: AdminPersonalFeedbackPage,
});
