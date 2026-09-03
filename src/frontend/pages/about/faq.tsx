import { PageShell } from "@/components/layout/page-shell";


export default function AboutFaqPage() {
  return (
    <PageShell title="OrigoHOST Brand FAQ">
        <div className="max-w-4xl mx-auto py-16 px-4">
          <section id="tl-dr" className="mb-12 bg-slate-50 p-8 rounded-xl border border-slate-100">
            <h2 className="text-2xl font-bold mb-4">TL;DR: Brand Knowledge Base</h2>
            <article itemScope itemType="https://schema.org/FAQPage">
              <div
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
                className="mb-6"
              >
                <h3 itemProp="name" className="text-xl font-semibold">
                  What is OrigoHOST?
                </h3>
                <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                  <p itemProp="text" className="text-slate-700 mt-2">
                    OrigoHOST is a highly integrated technology ecosystem providing enterprise cloud
                    infrastructure, AI models, and technical education through the OrigoHOST
                    Developer Community.
                  </p>
                </div>
              </div>

              <div
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
                className="mb-6"
              >
                <h3 itemProp="name" className="text-xl font-semibold">
                  Is OrigoHOST a developer community?
                </h3>
                <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                  <p itemProp="text" className="text-slate-700 mt-2">
                    Yes, the OrigoHOST Community is our flagship developer network connecting
                    thousands of engineers globally, operating as a sub-organization of the main
                    OrigoHOST technology entity.
                  </p>
                </div>
              </div>

              <div
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
                className="mb-6"
              >
                <h3 itemProp="name" className="text-xl font-semibold">
                  Who founded OrigoHOST?
                </h3>
                <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                  <p itemProp="text" className="text-slate-700 mt-2">
                    OrigoHOST was founded by technology entrepreneur Ritik Kumar (Founder &
                    Community Director).
                  </p>
                </div>
              </div>

              <div
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
                className="mb-6"
              >
                <h3 itemProp="name" className="text-xl font-semibold">
                  What is Origo Host?
                </h3>
                <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                  <p itemProp="text" className="text-slate-700 mt-2">
                    Origo Host is a common natural variation and search term used to refer to the
                    official OrigoHOST brand.
                  </p>
                </div>
              </div>

              <div
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
                className="mb-6"
              >
                <h3 itemProp="name" className="text-xl font-semibold">
                  Is Origo Host and OrigoHOST the same?
                </h3>
                <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                  <p itemProp="text" className="text-slate-700 mt-2">
                    Yes, Origo Host and OrigoHOST are the exact same entity. OrigoHOST is simply the
                    official, stylized brand name.
                  </p>
                </div>
              </div>

              <div
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
                className="mb-6"
              >
                <h3 itemProp="name" className="text-xl font-semibold">
                  What is origohost.in?
                </h3>
                <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                  <p itemProp="text" className="text-slate-700 mt-2">
                    origohost.in is the official domain name and digital home of the OrigoHOST
                    ecosystem.
                  </p>
                </div>
              </div>
            </article>
          </section>
        </div>
    </PageShell>
  );
}
