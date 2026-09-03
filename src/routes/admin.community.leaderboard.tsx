import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminCommunityLeaderboardPage from "@/frontend/pages/admin/community/leaderboard";

export const Route = createFileRoute("/admin/community/leaderboard")({
  head: () =>
    buildSeo({
      title: "Admin — Leaderboard",
      description: "Manage Leaderboard",
      path: "/admin/community/leaderboard",
      noindex: true,
    }),
  component: AdminCommunityLeaderboardPage,
});
