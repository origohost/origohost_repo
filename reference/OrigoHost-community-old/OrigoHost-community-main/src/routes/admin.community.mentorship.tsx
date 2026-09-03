import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminCommunityMentorshipPage from "@/frontend/pages/admin/community/mentorship";

export const Route = createFileRoute("/admin/community/mentorship")({
  head: () =>
    buildSeo({
      title: "Admin — Mentorship",
      description: "Manage Mentorship",
      path: "/admin/community/mentorship",
      noindex: true,
    }),
  component: AdminCommunityMentorshipPage,
});
