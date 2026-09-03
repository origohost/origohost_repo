import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminAiCenterAiSettingsPage from "@/frontend/pages/admin/aicenter/ai-settings";

export const Route = createFileRoute("/admin/ai-center/ai-settings")({
  head: () =>
    buildSeo({
      title: "Admin — AI Settings",
      description: "Manage AI Settings",
      path: "/admin/aicenter/ai-settings",
      noindex: true,
    }),
  component: AdminAiCenterAiSettingsPage,
});
