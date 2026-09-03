import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminAiCenterAiAnalyticsPage from "@/frontend/pages/admin/aicenter/ai-analytics";

export const Route = createFileRoute("/admin/ai-center/ai-analytics")({
  head: () =>
    buildSeo({
      title: "Admin — AI Analytics",
      description: "Manage AI Analytics",
      path: "/admin/aicenter/ai-analytics",
      noindex: true,
    }),
  component: AdminAiCenterAiAnalyticsPage,
});
