import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import {
  buildWebPageSchema,
  buildCourseSchema,
  buildOrganizationSchema,
} from "@/lib/structured-data";
import { SITE_CONFIG } from "@/config/site";
import AcademyPage from "@/frontend/pages/academy";

export const Route = createFileRoute("/academy")({
  head: () =>
    buildSeo({
      title: "Origo Academy | Technical Education & Workshops",
      description:
        "World-class technical education. Learn Cloud Computing, DevOps, and Artificial Intelligence directly from industry experts.",
      path: "/academy",
      schemas: [
        buildOrganizationSchema(),
        buildWebPageSchema(
          "Origo Academy | Technical Education",
          "World-class technical education in Cloud Computing and AI.",
          `${SITE_CONFIG.url}/academy`,
        ),
        buildCourseSchema({
          name: "Kubernetes for Developers",
          description:
            "Learn to containerize and deploy scalable applications using Kubernetes and Helm.",
          providerName: "Origo Academy",
        }),
        buildCourseSchema({
          name: "Generative AI Engineering",
          description: "Build robust LLM applications, RAG pipelines, and agentic workflows.",
          providerName: "Origo Academy",
        }),
        buildCourseSchema({
          name: "Cloud Infrastructure 101",
          description: "Master the fundamentals of Linux, networking, VPS, and cloud storage.",
          providerName: "Origo Academy",
        }),
      ],
    }),
  component: AcademyPage,
});
