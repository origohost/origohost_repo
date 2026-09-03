import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminAiCenterAiModerationPage from "@/frontend/pages/admin/aicenter/ai-moderation";

export const Route = createFileRoute("/admin/ai-center/ai-moderation")({
  head: () =>
    buildSeo({
      title: "Admin — AI Moderation",
      description: "Manage AI Moderation",
      path: "/admin/aicenter/ai-moderation",
      noindex: true,
    }),
  component: AdminAiCenterAiModerationPage,
});
