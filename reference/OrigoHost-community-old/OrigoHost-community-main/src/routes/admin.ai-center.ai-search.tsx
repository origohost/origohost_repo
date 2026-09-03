import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminAiCenterAiSearchPage from "@/frontend/pages/admin/aicenter/ai-search";

export const Route = createFileRoute("/admin/ai-center/ai-search")({
  head: () =>
    buildSeo({
      title: "Admin — AI Search",
      description: "Manage AI Search",
      path: "/admin/aicenter/ai-search",
      noindex: true,
    }),
  component: AdminAiCenterAiSearchPage,
});
