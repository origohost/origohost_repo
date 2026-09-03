import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminFaqPage from "@/frontend/pages/admin/faq";

export const Route = createFileRoute("/admin/faq")({
  head: () =>
    buildSeo({
      title: "Admin — FAQ",
      description: "Manage FAQ entries.",
      path: "/admin/faq",
      noindex: true,
    }),
  component: AdminFaqPage,
});
