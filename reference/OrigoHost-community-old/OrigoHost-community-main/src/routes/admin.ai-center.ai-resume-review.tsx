import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminAiCenterAiResumeReviewPage from "@/frontend/pages/admin/aicenter/ai-resume-review";

export const Route = createFileRoute("/admin/ai-center/ai-resume-review")({
  head: () =>
    buildSeo({
      title: "Admin — AI Resume Review",
      description: "Manage AI Resume Review",
      path: "/admin/aicenter/ai-resume-review",
      noindex: true,
    }),
  component: AdminAiCenterAiResumeReviewPage,
});
