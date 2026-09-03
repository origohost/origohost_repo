import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminAiCenterPromptTemplatesPage from "@/frontend/pages/admin/aicenter/prompt-templates";

export const Route = createFileRoute("/admin/ai-center/prompt-templates")({
  head: () =>
    buildSeo({
      title: "Admin — Prompt Templates",
      description: "Manage Prompt Templates",
      path: "/admin/aicenter/prompt-templates",
      noindex: true,
    }),
  component: AdminAiCenterPromptTemplatesPage,
});
