import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import { contentLoader } from "@/features/cms";
import TermsPage from "@/frontend/pages/terms";

const content = contentLoader.getSync("terms");

export const Route = createFileRoute("/terms")({
  head: () =>
    buildSeo({
      title: content.meta.title,
      description: content.meta.description,
      path: "/terms",
    }),
  component: TermsPage,
});
