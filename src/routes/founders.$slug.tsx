import { createFileRoute } from "@tanstack/react-router";
import { contentLoader } from "@/features/cms";
import FounderProfilePage from "@/frontend/pages/founders/profile";
import { buildSeo } from "@/lib/seo";
import {
  buildDynamicPersonSchema,
  buildOrganizationSchema,
  buildProfilePageSchema,
  buildFAQSchema,
  buildBreadcrumbSchema,
  buildWebPageSchema,
  buildImageObjectSchema,
} from "@/lib/structured-data";
import { SITE_CONFIG } from "@/config/site";

export const Route = createFileRoute("/founders/$slug")({
  loader: ({ params }) => {
    const founders = contentLoader.getSync("founders");
    const founder = founders.profiles.find((p) => p.slug === params.slug);
    if (!founder) throw new Error("Founder not found");
    return { founder };
  },
  head: ({ loaderData }) => {
    if (!loaderData?.founder) return buildSeo({ title: "Founder Not Found" });
    const { founder } = loaderData;
    const url = `${SITE_CONFIG.url}/founders/${founder.slug}`;

    const schemas: any[] = [
      buildDynamicPersonSchema(founder),
      buildOrganizationSchema(),
      buildProfilePageSchema(founder),
      buildWebPageSchema(`${founder.name} - ${founder.role}`, founder.biography, url),
      buildBreadcrumbSchema([
        { label: "Home", url: "/" },
        { label: "Founders" },
        { label: founder.name, url: `/founders/${founder.slug}` },
      ]),
    ];

    if (founder.faqs && founder.faqs.length > 0) {
      schemas.push(buildFAQSchema(founder.faqs));
    }

    if (founder.avatarUrl) {
      schemas.push(
        buildImageObjectSchema(
          `${SITE_CONFIG.url}${founder.avatarUrl}`,
          `Portrait of ${founder.name}`,
        ),
      );
    }

    return buildSeo({
      title: `${founder.name} — ${founder.role}`,
      description: founder.biography,
      path: `/founders/${founder.slug}`,
      schemas,
    });
  },
  component: FounderRouteComponent,
});

function FounderRouteComponent() {
  const { founder } = Route.useLoaderData();
  return <FounderProfilePage founder={founder} />;
}
