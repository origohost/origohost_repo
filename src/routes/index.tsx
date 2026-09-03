import { SITE_CONFIG } from "@/config/site";
import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import { buildOrganizationSchema, buildFAQSchema, buildWebSiteSchema } from "@/lib/structured-data";
import { partnersQueryOptions } from "@/features/cms/partners.query";
import HomePage from "@/frontend/pages/home";

const HOME_FAQS = [
  {
    question: "What is OrigoHOST?",
    answer:
      "OrigoHOST is India's premier Developer and Technology Community focusing on Artificial Intelligence, Cloud Computing, DevOps, and Hackathons.",
  },
  {
    question: "Who founded OrigoHOST?",
    answer:
      "OrigoHOST was founded by technology entrepreneur Ritik Kumar.",
  },
  {
    question: "What events does OrigoHOST organize?",
    answer:
      "We organize massive hackathons, technical workshops, and mentorship programs for software engineers and student developers across India.",
  },
];

export const Route = createFileRoute("/")({
  head: () =>
    buildSeo({
      title: "Home",
      description:
        "OrigoHOST Community — India's leading hosting & infrastructure community for developers. Learn, build, and grow with modern AI and cloud engineering.",
      path: "/",
      preloadImage: "https://res.cloudinary.com/dhx72dmyt/image/upload/f_auto,q_auto/v1785444373/system/hero-bg-team.jpg",
      schemas: [buildOrganizationSchema(), buildFAQSchema(HOME_FAQS), buildWebSiteSchema()],
    }),
  loader: ({ context }) => context.queryClient.ensureQueryData(partnersQueryOptions()),
  component: HomePage,
});
