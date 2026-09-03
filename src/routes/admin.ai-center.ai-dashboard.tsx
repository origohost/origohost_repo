import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminAiCenterAiDashboardPage from "@/frontend/pages/admin/aicenter/ai-dashboard";

export const Route = createFileRoute("/admin/ai-center/ai-dashboard")({
  head: () =>
    buildSeo({
      title: "Admin — AI Dashboard",
      description: "Manage AI Dashboard",
      path: "/admin/aicenter/ai-dashboard",
      noindex: true,
    }),
  component: AdminAiCenterAiDashboardPage,
});
