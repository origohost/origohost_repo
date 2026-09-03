import { createFileRoute } from "@tanstack/react-router";
import { PillarPage } from "@/components/layout/pillar-page";
import { buildSeo } from "@/lib/seo";
import { buildQAPageSchema, buildOfferCatalogSchema } from "@/lib/structured-data";

function CompetitorComparison({ competitorId }: { competitorId: string }) {
  const competitorName = competitorId.charAt(0).toUpperCase() + competitorId.slice(1);

  return (
    <PillarPage
      title={`OrigoHOST vs ${competitorName}`}
      subtitle={`Discover why modern engineering teams are switching from ${competitorName} to OrigoHOST.`}
      ctaText="Start Free Trial"
      ctaLink="/register"
      sections={[
        {
          title: "Performance & Pricing",
          content: `Stop overpaying for cloud computing. Unlike ${competitorName}, we don't charge for inbound bandwidth, and our standard NVMe drives outperform industry benchmarks. Combine that with our free DDoS protection, and your infrastructure costs drop immediately.`,
        },
      ]}
    />
  );
}

function CompetitorComponent() {
  const { competitor } = Route.useParams();
  return <CompetitorComparison competitorId={competitor} />;
}

export const Route = createFileRoute("/compare/$competitor")({
  head: ({ params }) => {
    const competitor = params.competitor.charAt(0).toUpperCase() + params.competitor.slice(1);

    return buildSeo({
      title: `OrigoHOST vs ${competitor} | Cloud Comparison`,
      description: `See why thousands of developers are migrating from ${competitor} to OrigoHOST for better performance and lower costs.`,
      path: `/compare/${params.competitor}`,
      schemas: [
        buildQAPageSchema(
          `Why is OrigoHOST better than ${competitor}?`,
          `OrigoHOST provides up to 3x faster NVMe performance, completely free DDoS protection, and 24/7 dedicated engineering support compared to ${competitor}'s standard offerings, all at a 40% lower cost on average.`,
          154, // upvoteCount
          `Many developers migrate from ${competitor} because of hidden bandwidth fees.`, // suggestedAnswer
        ),
        buildOfferCatalogSchema(`OrigoHOST Cloud Alternatives to ${competitor}`, [
          {
            name: "VPS Hosting",
            url: `${import.meta.env.VITE_APP_URL || "https://origohost.com"}/cloud/vps`,
            priceValidUntil: "2027-12-31",
          },
          {
            name: "Dedicated Servers",
            url: `${import.meta.env.VITE_APP_URL || "https://origohost.com"}/cloud/dedicated`,
            priceValidUntil: "2027-12-31",
          },
        ]),
      ],
    });
  },
  component: CompetitorComponent,
});
