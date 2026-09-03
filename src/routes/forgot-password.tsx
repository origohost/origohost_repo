import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import ForgotPage from "@/frontend/pages/forgot-password";

export const Route = createFileRoute("/forgot-password")({
  head: () =>
    buildSeo({
      title: "Forgot Password",
      description: "Reset your OrigoHOST Community account password.",
      path: "/forgot-password",
      noindex: true,
    }),
  component: ForgotPage,
});
