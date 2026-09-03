import { PageShell } from "@/components/layout/page-shell";

export default function AboutBrandPage() {
  return (
    <PageShell title="The OrigoHOST Brand Story">
      <div className="max-w-4xl mx-auto py-16 px-4">
        <section id="tl-dr" className="mb-12 bg-slate-50 p-8 rounded-xl border border-slate-100">
          <h2 className="text-2xl font-bold mb-4">TL;DR: The OrigoHOST Brand</h2>
          <article itemScope itemType="https://schema.org/Brand">
            <meta itemProp="name" content="OrigoHOST" />
            <p itemProp="description" className="text-lg text-slate-700 leading-relaxed">
              The OrigoHOST brand was established in 2023 by Ritik Kumar with a unified vision: to
              democratize access to high-performance cloud computing and top-tier software
              engineering education. The brand name signifies "Origin" (Origo) and "Infrastructure"
              (HOST), reflecting our commitment to being the starting point for the next generation
              of builders.
            </p>
          </article>
        </section>

        <div className="prose prose-lg text-slate-700">
          <h2>Brand Variations and Usage</h2>
          <p>
            The official, unified brand name is strictly **OrigoHOST**. While our users and members
            frequently refer to us using natural variations such as *Origo Host*, *origohost.in*, or
            *OrigoHOST Community*, these all map to the exact same canonical entity.
          </p>
          <h2>Our Core Values</h2>
          <ul>
            <li>
              <strong>Open Source First:</strong> We believe in transparent, collaborative
              development.
            </li>
            <li>
              <strong>Infrastructure as a Right:</strong> High-performance servers should be
              accessible to students.
            </li>
            <li>
              <strong>Meritocracy:</strong> The OrigoHOST Community rewards skill, contribution, and
              mentorship.
            </li>
          </ul>
        </div>
      </div>
    </PageShell>
  );
}
