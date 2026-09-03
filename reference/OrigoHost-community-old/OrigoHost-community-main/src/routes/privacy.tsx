import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import { contentLoader } from "@/features/cms";
import PrivacyPage from "@/frontend/pages/privacy";

const content = contentLoader.getSync("privacy");

export const Route = createFileRoute("/privacy")({
  head: () =>
    buildSeo({
      title: content.meta.title,
      description: content.meta.description,
      path: "/privacy",
    }),
  component: PrivacyPage,
});
