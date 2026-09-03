import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminAiCenterAiChatbotPage from "@/frontend/pages/admin/aicenter/ai-chatbot";

export const Route = createFileRoute("/admin/ai-center/ai-chatbot")({
  head: () =>
    buildSeo({
      title: "Admin — AI Chatbot",
      description: "Manage AI Chatbot",
      path: "/admin/aicenter/ai-chatbot",
      noindex: true,
    }),
  component: AdminAiCenterAiChatbotPage,
});
