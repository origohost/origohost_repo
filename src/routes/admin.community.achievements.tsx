import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminCommunityAchievementsPage from "@/frontend/pages/admin/community/achievements";

export const Route = createFileRoute("/admin/community/achievements")({
  head: () =>
    buildSeo({
      title: "Admin — Achievements",
      description: "Manage Achievements",
      path: "/admin/community/achievements",
      noindex: true,
    }),
  component: AdminCommunityAchievementsPage,
});
