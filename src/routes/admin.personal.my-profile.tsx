import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminPersonalMyProfilePage from "@/frontend/pages/admin/personal/my-profile";

export const Route = createFileRoute("/admin/personal/my-profile")({
  head: () =>
    buildSeo({
      title: "Admin — My Profile",
      description: "Manage My Profile",
      path: "/admin/personal/my-profile",
      noindex: true,
    }),
  component: AdminPersonalMyProfilePage,
});
