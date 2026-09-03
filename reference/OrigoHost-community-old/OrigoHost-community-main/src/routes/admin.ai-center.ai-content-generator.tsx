import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminAiCenterAiContentGeneratorPage from "@/frontend/pages/admin/aicenter/ai-content-generator";

export const Route = createFileRoute("/admin/ai-center/ai-content-generator")({
  head: () =>
    buildSeo({
      title: "Admin — AI Content Generator",
      description: "Manage AI Content Generator",
      path: "/admin/aicenter/ai-content-generator",
      noindex: true,
    }),
  component: AdminAiCenterAiContentGeneratorPage,
});
