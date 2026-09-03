import { createFileRoute } from "@tanstack/react-router";
import { PillarPage } from "@/components/layout/pillar-page";
import { buildSeo } from "@/lib/seo";
import { buildSoftwareApplicationSchema, buildBreadcrumbSchema } from "@/lib/structured-data";

function TechnologyComponent() {
  const { tech } = Route.useParams();
  const techName = tech.charAt(0).toUpperCase() + tech.slice(1);

  return (
    <PillarPage
      title={`Deploy ${techName} on OrigoHOST`}
      subtitle={`Experience blazing fast, fully managed infrastructure tuned specifically for your ${techName} applications.`}
      ctaText="Deploy Now"
      ctaLink="/register"
      sections={[
        {
          title: `Why host ${techName} with us?`,
          content: `We provide bare-metal performance, NVMe storage, and pre-configured environments tailored for ${techName} developers. Our edge networking ensures your global users experience zero latency.`,
        },
      ]}
    />
  );
}

export const Route = createFileRoute("/technologies/$tech")({
  head: ({ params }) => {
    const techName = params.tech.charAt(0).toUpperCase() + params.tech.slice(1);

    return buildSeo({
      title: `Deploy ${techName} on OrigoHOST Cloud`,
      description: `Optimized, scalable, and high-performance hosting for ${techName} applications on OrigoHOST Enterprise Cloud.`,
      path: `/technologies/${params.tech}`,
      schemas: [
        buildSoftwareApplicationSchema({
          name: `${techName} Hosting`,
          description: `Managed ${techName} cloud infrastructure`,
          applicationCategory: "DeveloperApplication",
          operatingSystem: "Linux",
          featureList: [
            `1-Click ${techName} Deploy`,
            "Auto-scaling",
            "DDoS Protection",
            "99.99% Uptime",
          ],
          softwareRequirements: `${techName} ecosystem`,
        }),
        buildBreadcrumbSchema([
          { label: "Home", url: "/" },
          { label: "Technologies", url: "/technologies" },
          { label: techName, url: `/technologies/${params.tech}` },
        ]),
      ],
    });
  },
  component: TechnologyComponent,
});
