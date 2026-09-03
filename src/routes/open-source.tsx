import { createFileRoute } from "@tanstack/react-router";
import { PillarPage } from "@/components/layout/pillar-page";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/open-source")({
  head: () =>
    buildSeo({
      title: "Open Source Initiatives",
      description: "OrigoHOST is committed to supporting and sustaining the Open Source ecosystem.",
      path: "/open-source",
    }),
  component: () => (
    <PillarPage
      title="Open Source"
      subtitle="We believe in the power of open collaboration. We sponsor projects, host hackathons, and provide free infrastructure for OSS."
      heroImage="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2000&auto=format&fit=crop"
      content={`
        <h2>Free Infrastructure for OSS</h2>
        <p>If you maintain a qualifying open-source project, we provide free hosting, compute, and bandwidth to help you scale without worry.</p>
        
        <h2>Sponsorships</h2>
        <p>We actively sponsor maintainers and foundational projects that power the modern web ecosystem.</p>
        
        <h2>Contributions</h2>
        <p>Our engineers contribute code, documentation, and tooling back to the upstream projects we rely on.</p>
      `}
      features={[
        { title: "Free Tier", desc: "$500/mo in credits for qualifying OSS projects." },
        { title: "Sponsorships", desc: "Direct funding for maintainers." },
        { title: "Community Driven", desc: "Governed by transparent community guidelines." },
      ]}
    />
  ),
});
