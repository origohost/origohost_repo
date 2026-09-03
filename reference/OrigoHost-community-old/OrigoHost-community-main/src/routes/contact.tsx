import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import { contentLoader } from "@/features/cms";
import ContactPage from "@/frontend/pages/contact";

const content = contentLoader.getSync("contact");

export const Route = createFileRoute("/contact")({
  head: () =>
    buildSeo({
      title: content.meta.title,
      description: content.meta.description,
      path: "/contact",
    }),
  component: ContactPage,
});
