import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import RegisterPage from "@/frontend/pages/joincommunity";

export const Route = createFileRoute("/register")({
  head: () =>
    buildSeo({
      title: "Join the OrigoHOST Community",
      description:
        "Create your OrigoHOST account and join thousands of developers, founders, and infra engineers building the future of hosting in India.",
      path: "/register",
    }),
  component: RegisterPage,
});
