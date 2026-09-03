import { createFileRoute } from "@tanstack/react-router";
import { PillarPage } from "@/components/layout/pillar-page";
import { buildSeo } from "@/lib/seo";
import { buildBreadcrumbSchema } from "@/lib/structured-data";

export const Route = createFileRoute("/community_/chapters")({
  head: () =>
    buildSeo({
      title: "Student Chapters",
      description: "Start an OrigoHOST Student Chapter at your university.",
      path: "/community/chapters",
      schemas: [
        buildBreadcrumbSchema([
          { label: "Home", url: "/" },
          { label: "Community", url: "/community" },
          { label: "Chapters", url: "/community/chapters" },
        ]),
      ],
    }),
  component: () => (
    <PillarPage
      title="Student Chapters"
      subtitle="Empowering the next generation of developers to build local tech communities on campus."
      heroImage="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2000&auto=format&fit=crop"
      content={`
        <h2>What is a Student Chapter?</h2>
        <p>A student chapter is a university-based community of developers, designers, and tech enthusiasts. We provide the funding, resources, and mentorship to help you run amazing events.</p>
        
        <h2>Why Start One?</h2>
        <p>Gain leadership experience, network with industry professionals, and get access to exclusive swags and internship opportunities.</p>
        
        <h2>How to Apply?</h2>
        <p>You can apply through our Ambassador Portal. Selected students will undergo a screening process and receive a starter kit.</p>
      `}
      features={[
        { title: "Event Funding", desc: "We sponsor your campus hackathons and meetups." },
        { title: "Swag Kits", desc: "T-Shirts, hoodies, and stickers for your members." },
        { title: "Direct Mentorship", desc: "1:1 guidance from OrigoHOST engineers." },
      ]}
    />
  ),
});
