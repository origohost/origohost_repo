import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminPersonalConnectedAccountsPage from "@/frontend/pages/admin/personal/connected-accounts";

export const Route = createFileRoute("/admin/personal/connected-accounts")({
  head: () =>
    buildSeo({
      title: "Admin — Connected Accounts",
      description: "Manage Connected Accounts",
      path: "/admin/personal/connected-accounts",
      noindex: true,
    }),
  component: AdminPersonalConnectedAccountsPage,
});
