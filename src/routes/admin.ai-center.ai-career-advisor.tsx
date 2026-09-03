import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminAiCenterAiCareerAdvisorPage from "@/frontend/pages/admin/aicenter/ai-career-advisor";

export const Route = createFileRoute("/admin/ai-center/ai-career-advisor")({
  head: () =>
    buildSeo({
      title: "Admin — AI Career Advisor",
      description: "Manage AI Career Advisor",
      path: "/admin/aicenter/ai-career-advisor",
      noindex: true,
    }),
  component: AdminAiCenterAiCareerAdvisorPage,
});
