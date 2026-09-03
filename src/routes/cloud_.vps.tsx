import { createFileRoute } from "@tanstack/react-router";
import { PillarPage } from "@/components/layout/pillar-page";
import { buildSeo } from "@/lib/seo";
import { buildArticleSchema, buildBreadcrumbSchema } from "@/lib/structured-data";

export const Route = createFileRoute("/cloud_/vps")({
  head: () =>
    buildSeo({
      title: "Enterprise Hosting",
      description:
        "Scale your applications with OrigoHOST high-performance enterprise hosting solutions.",
      path: "/hosting",
      schemas: [
        buildArticleSchema({
          title: "Enterprise Hosting Solutions",
          image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1000",
          datePublished: "2024-10-01",
          authorName: "OrigoHOST Team",
        }),
        buildBreadcrumbSchema([
          { label: "Home", url: "/" },
          { label: "Cloud", url: "/cloud" },
          { label: "VPS", url: "/cloud/vps" },
        ]),
      ],
    }),
  component: () => (
    <PillarPage
      title="Enterprise Hosting"
      subtitle="Robust, scalable, and fully-managed hosting infrastructure designed for modern development teams."
      heroImage="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2000&auto=format&fit=crop"
      content={`
        <h2>Built for Scale</h2>
        <p>Our hosting infrastructure is designed from the ground up to handle massive traffic spikes, global distribution, and demanding workloads.</p>
        
        <h2>Global Edge Network</h2>
        <p>Deploy your applications closer to your users with our global network of edge locations, reducing latency and improving TTFB.</p>
        
        <h2>Automated Backups & Security</h2>
        <p>Rest easy knowing your data is protected with automated daily backups, advanced DDoS mitigation, and hardware-level firewalls.</p>
      `}
      features={[
        { title: "99.99% Uptime", desc: "Enterprise SLA backing our robust architecture." },
        { title: "NVMe Storage", desc: "Blazing fast I/O for your databases and assets." },
        { title: "DDoS Protection", desc: "L3/L4/L7 mitigation included out of the box." },
      ]}
    />
  ),
});
