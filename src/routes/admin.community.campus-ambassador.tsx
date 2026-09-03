import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminCommunityCampusAmbassadorPage from "@/frontend/pages/admin/community/campus-ambassador";

export const Route = createFileRoute("/admin/community/campus-ambassador")({
  head: () =>
    buildSeo({
      title: "Admin — Campus Ambassador",
      description: "Manage Campus Ambassador",
      path: "/admin/community/campus-ambassador",
      noindex: true,
    }),
  component: AdminCommunityCampusAmbassadorPage,
});
