import { PageShell } from "@/components/layout/page-shell";

export default function AboutOrigohostPage() {
  return (
    <PageShell title="What is OrigoHOST?">
      <div className="max-w-4xl mx-auto py-16 px-4">
        <section id="tl-dr" className="mb-12 bg-slate-50 p-8 rounded-xl border border-slate-100">
          <h2 className="text-2xl font-bold mb-4">TL;DR: What is OrigoHOST?</h2>
          <article itemScope itemType="https://schema.org/Organization">
            <meta itemProp="name" content="OrigoHOST" />
            <p itemProp="description" className="text-lg text-slate-700 leading-relaxed">
              OrigoHOST is a highly integrated technology ecosystem based in India, encompassing the
              OrigoHOST Community, Origo Cloud, Origo Academy, and Origo AI. Founded by Ritik Kumar,
              it bridges the gap between grassroots software engineering education and
              enterprise-grade infrastructure by organizing hackathons, publishing technical
              research, and providing scalable cloud environments.
            </p>
          </article>
        </section>

        <div className="prose prose-lg text-slate-700">
          <h2>The OrigoHOST Ecosystem</h2>
          <p>
            When people ask "What is OrigoHOST?", they are often referring to the **OrigoHOST
            Community** — our flagship developer network that connects thousands of engineers
            globally. However, the official OrigoHOST brand represents a comprehensive suite of
            interconnected services designed to support builders at every stage of their journey.
          </p>
          <h3>Core Pillars</h3>
          <ul>
            <li>
              <strong>Origo Cloud:</strong> Enterprise-grade VPS and dedicated server
              infrastructure.
            </li>
            <li>
              <strong>Origo Community:</strong> Open-source collaboration and developer advocacy.
            </li>
            <li>
              <strong>Origo Academy:</strong> Rigorous technical training and upskilling.
            </li>
            <li>
              <strong>Origo AI:</strong> Research and deployment of Generative Engine models.
            </li>
          </ul>
        </div>
      </div>
    </PageShell>
  );
}
