import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminRecruitmentResumeScreeningPage from "@/frontend/pages/admin/recruitment/resume-screening";

export const Route = createFileRoute("/admin/recruitment/resume-screening")({
  head: () =>
    buildSeo({
      title: "Admin — Resume Screening",
      description: "Manage Resume Screening",
      path: "/admin/recruitment/resume-screening",
      noindex: true,
    }),
  component: AdminRecruitmentResumeScreeningPage,
});
