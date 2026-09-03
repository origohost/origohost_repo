import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminPersonalHelpPage from "@/frontend/pages/admin/personal/help";

export const Route = createFileRoute("/admin/personal/help")({
  head: () =>
    buildSeo({
      title: "Admin — Help",
      description: "Manage Help",
      path: "/admin/personal/help",
      noindex: true,
    }),
  component: AdminPersonalHelpPage,
});
