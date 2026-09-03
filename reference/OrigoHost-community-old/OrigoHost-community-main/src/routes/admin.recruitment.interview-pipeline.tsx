import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminRecruitmentInterviewPipelinePage from "@/frontend/pages/admin/recruitment/interview-pipeline";

export const Route = createFileRoute("/admin/recruitment/interview-pipeline")({
  head: () =>
    buildSeo({
      title: "Admin — Interview Pipeline",
      description: "Manage Interview Pipeline",
      path: "/admin/recruitment/interview-pipeline",
      noindex: true,
    }),
  component: AdminRecruitmentInterviewPipelinePage,
});
