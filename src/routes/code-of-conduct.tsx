import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/layout/legal-page";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/code-of-conduct")({
  head: () =>
    buildSeo({
      title: "Code of Conduct",
      description: "OrigoHOST Community Code of Conduct",
      path: "/code-of-conduct",
    }),
  component: () => (
    <LegalPage
      title="Code of Conduct"
      lastUpdated="October 2024"
      content={`
        <h2>1. Our Pledge</h2>
        <p>In the interest of fostering an open and welcoming environment, we as contributors and maintainers pledge to making participation in our project and our community a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, sex characteristics, gender identity and expression, level of experience, education, socio-economic status, nationality, personal appearance, race, religion, or sexual identity and orientation.</p>
        
        <h2>2. Our Standards</h2>
        <p>Examples of behavior that contributes to creating a positive environment include:</p>
        <ul>
          <li>Using welcoming and inclusive language</li>
          <li>Being respectful of differing viewpoints and experiences</li>
          <li>Gracefully accepting constructive criticism</li>
          <li>Focusing on what is best for the community</li>
        </ul>
      `}
    />
  ),
});
