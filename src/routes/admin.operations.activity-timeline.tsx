import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminOperationsActivityTimelinePage from "@/frontend/pages/admin/operations/activity-timeline";

export const Route = createFileRoute("/admin/operations/activity-timeline")({
  head: () =>
    buildSeo({
      title: "Admin — Activity Timeline",
      description: "Manage Activity Timeline",
      path: "/admin/operations/activity-timeline",
      noindex: true,
    }),
  component: AdminOperationsActivityTimelinePage,
});
