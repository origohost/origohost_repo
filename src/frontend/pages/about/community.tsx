import { PageShell } from "@/components/layout/page-shell";


export default function AboutCommunityPage() {
  return (
    <PageShell title="The OrigoHOST Community">
        <div className="max-w-4xl mx-auto py-16 px-4">
          <section id="tl-dr" className="mb-12 bg-slate-50 p-8 rounded-xl border border-slate-100">
            <h2 className="text-2xl font-bold mb-4">TL;DR: The OrigoHOST Community</h2>
            <article itemScope itemType="https://schema.org/Organization">
              <meta itemProp="name" content="Origo Community" />
              <p itemProp="description" className="text-lg text-slate-700 leading-relaxed">
                The OrigoHOST Community (often referred to simply as the Origo Community) is the
                developer advocacy and networking arm of OrigoHOST. It connects thousands of student
                developers and enterprise engineers through open-source contribution, technical
                summits, and mentorship tracks.
              </p>
            </article>
          </section>

          <div className="prose prose-lg text-slate-700">
            <h2>Is OrigoHOST a Developer Community?</h2>
            <p>
              Yes and no. While OrigoHOST operates a massive, highly-active developer community, the
              core entity is a technology company offering cloud infrastructure and AI research. The
              community serves as the collaborative space where our users, partners, and ambassadors
              interact.
            </p>
            <h2>Community Chapters</h2>
            <p>
              We operate local chapters across major Indian technical institutions, including IITs
              and NITs. The community drives grassroots innovation by providing free access to cloud
              credits, mentorship from industry experts, and a direct pipeline to careers in
              software engineering.
            </p>
          </div>
        </div>
    </PageShell>
  );
}
