import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminMessagesPage from "@/frontend/pages/admin/messages";

export const Route = createFileRoute("/admin/messages")({
  head: () =>
    buildSeo({
      title: "Admin — Messages",
      description: "Contact form submissions.",
      path: "/admin/messages",
      noindex: true,
    }),
  component: AdminMessagesPage,
});
