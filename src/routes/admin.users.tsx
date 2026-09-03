import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminUsersPage from "@/frontend/pages/admin/users";

export const Route = createFileRoute("/admin/users")({
  head: () =>
    buildSeo({
      title: "Admin — Users",
      description: "Manage platform users and profiles.",
      path: "/admin/users",
      noindex: true,
    }),
  component: AdminUsersPage,
});
