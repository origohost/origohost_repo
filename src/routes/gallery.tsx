import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import { contentLoader } from "@/features/cms";
import GalleryPage from "@/frontend/pages/gallery";

const content = contentLoader.getSync("gallery");

export const Route = createFileRoute("/gallery")({
  head: () =>
    buildSeo({
      title: content.meta.title,
      description: content.meta.description,
      path: "/gallery",
    }),
  component: GalleryPage,
});
