import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminPageBlocksPage from "@/frontend/pages/admin/page-blocks";

export const Route = createFileRoute("/admin/page-blocks")({
  head: () =>
    buildSeo({
      title: "Admin — Page Blocks",
      description: "Manage page block JSON data.",
      path: "/admin/page-blocks",
      noindex: true,
    }),
  component: AdminPageBlocksPage,
});
