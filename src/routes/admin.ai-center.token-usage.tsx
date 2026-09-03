import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminAiCenterTokenUsagePage from "@/frontend/pages/admin/aicenter/token-usage";

export const Route = createFileRoute("/admin/ai-center/token-usage")({
  head: () =>
    buildSeo({
      title: "Admin — Token Usage",
      description: "Manage Token Usage",
      path: "/admin/aicenter/token-usage",
      noindex: true,
    }),
  component: AdminAiCenterTokenUsagePage,
});
