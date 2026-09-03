import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import ResetPasswordPage from "@/frontend/pages/reset-password";

export const Route = createFileRoute("/reset-password")({
  head: () =>
    buildSeo({
      title: "Reset password",
      description: "Set a new password for your OrigoHOST account.",
      path: "/reset-password",
      noindex: true,
    }),
  component: ResetPasswordPage,
});
