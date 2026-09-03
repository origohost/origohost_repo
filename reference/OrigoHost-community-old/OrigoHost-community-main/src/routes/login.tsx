import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { buildSeo } from "@/lib/seo";
import authHero from "@/assets/auth-hero.webp";
import LoginPage from "@/frontend/pages/login";

const loginSearchSchema = z.object({
  redirect: z.string().optional(),
});

export const Route = createFileRoute("/login")({
  validateSearch: loginSearchSchema,
  head: () => {
    const seo = buildSeo({
      title: "Login",
      description: "Sign in to OrigoHOST Community to manage events, jobs, and your profile.",
      path: "/login",
      noindex: true,
    });
    return {
      ...seo,
      links: [
        ...(seo.links || []),
        { rel: "preload", as: "image", href: authHero, fetchPriority: "high" },
      ],
    };
  },
  component: LoginPage,
});
