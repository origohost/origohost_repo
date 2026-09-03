import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminJobApplicationsPage from "@/frontend/pages/admin/job-applications";

export const Route = createFileRoute("/admin/job-applications")({
  head: () =>
    buildSeo({
      title: "Admin — Job Applications",
      description: "Review and manage job applications.",
      path: "/admin/job-applications",
      noindex: true,
    }),
  component: AdminJobApplicationsPage,
});
