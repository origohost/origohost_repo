import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import { contentLoader } from "@/features/cms";
import CookiesPage from "@/frontend/pages/cookies";

const content = contentLoader.getSync("cookies");

export const Route = createFileRoute("/cookies")({
  head: () =>
    buildSeo({
      title: content.meta.title,
      description: content.meta.description,
      path: "/cookies",
    }),
  component: CookiesPage,
});
