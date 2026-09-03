import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import { buildFAQSchema, buildSpeakableSchema } from "@/lib/structured-data";
import { contentLoader } from "@/features/cms";
import FaqPage from "@/frontend/pages/faq";

const content = contentLoader.getSync("faq");

export const Route = createFileRoute("/faq")({
  head: () =>
    buildSeo({
      title: content.meta.title,
      description: content.meta.description,
      path: "/faq",
      schemas: [
        buildFAQSchema(content.items),
        buildSpeakableSchema(["h2", ".geo-chunk", "[itemprop='acceptedAnswer']"]),
      ],
    }),
  component: FaqPage,
});
