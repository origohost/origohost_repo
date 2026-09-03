import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminAiCenterAiLogsPage from "@/frontend/pages/admin/aicenter/ai-logs";

export const Route = createFileRoute("/admin/ai-center/ai-logs")({
  head: () =>
    buildSeo({
      title: "Admin — AI Logs",
      description: "Manage AI Logs",
      path: "/admin/aicenter/ai-logs",
      noindex: true,
    }),
  component: AdminAiCenterAiLogsPage,
});
