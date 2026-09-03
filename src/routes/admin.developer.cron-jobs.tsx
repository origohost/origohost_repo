import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminDeveloperCronJobsPage from "@/frontend/pages/admin/developer/cron-jobs";

export const Route = createFileRoute("/admin/developer/cron-jobs")({
  head: () =>
    buildSeo({
      title: "Admin — Cron Jobs",
      description: "Manage Cron Jobs",
      path: "/admin/developer/cron-jobs",
      noindex: true,
    }),
  component: AdminDeveloperCronJobsPage,
});
