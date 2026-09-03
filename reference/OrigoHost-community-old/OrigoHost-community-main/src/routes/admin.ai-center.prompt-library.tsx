import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminAiCenterPromptLibraryPage from "@/frontend/pages/admin/aicenter/prompt-library";

export const Route = createFileRoute("/admin/ai-center/prompt-library")({
  head: () =>
    buildSeo({
      title: "Admin — Prompt Library",
      description: "Manage Prompt Library",
      path: "/admin/aicenter/prompt-library",
      noindex: true,
    }),
  component: AdminAiCenterPromptLibraryPage,
});
