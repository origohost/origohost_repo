import React from "react";
import { PageShell } from "@/components/layout/page-shell";
import { sanitizeHtml } from "@/lib/sanitize";

interface PillarPageProps {
  title: string;
  subtitle: string;
  heroImage?: string;
  content?: string | React.ReactNode;
  features?: { title: string; desc: string }[];
  ctaText?: string;
  ctaLink?: string;
  sections?: { title: string; content: string }[];
}

export function PillarPage({
  title,
  subtitle,
  heroImage,
  content,
  features,
  ctaText,
  ctaLink,
  sections,
}: PillarPageProps) {
  return (
    <PageShell title={title} description={subtitle}>
      <div className="bg-white min-h-screen">
        {/* Hero */}
        <section className="relative pt-32 pb-20 bg-blue-900 text-white overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-cyan-900 opacity-90 z-10" />
          {heroImage && (
            <img
              loading="lazy"
              decoding="async"
              src={heroImage}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30 z-0"
            />
          )}
          <div className="container mx-auto px-6 relative z-20">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black mb-6 max-w-4xl">{title}</h1>
            <p className="text-lg sm:text-xl text-blue-100 max-w-2xl leading-relaxed">{subtitle}</p>
            {ctaText && ctaLink && (
              <a
                href={ctaLink}
                className="inline-block mt-8 bg-white text-blue-900 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition"
              >
                {ctaText}
              </a>
            )}
          </div>
        </section>

        {/* Content & Features */}
        <section className="py-24 container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="lg:w-2/3 max-w-none">
              {typeof content === "string" ? (
                <div
                  className="prose prose-lg prose-blue max-w-none prose-img:rounded-2xl prose-img:shadow-sm prose-table:w-full prose-table:overflow-x-auto"
                  dangerouslySetInnerHTML={{ __html: sanitizeHtml(content) }}
                />
              ) : (
                content
              )}

              {sections &&
                sections.map((section, idx) => (
                  <div key={idx} className="mt-12 prose prose-lg prose-blue">
                    <h2>{section.title}</h2>
                    <p>{section.content}</p>
                  </div>
                ))}
            </div>
            <div className="lg:w-1/3 w-full">
              <div className="bg-gray-50 rounded-3xl p-6 md:p-8 border border-gray-100 sticky top-24">
                <h3 className="text-2xl font-bold mb-4 md:mb-6">Key Capabilities</h3>
                <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-6 px-6 md:mx-0 md:px-0 md:pb-0 md:flex-col lg:flex-col hide-scrollbar">
                  {(features || []).map((f, i) => (
                    <div
                      key={i}
                      className="snap-center shrink-0 w-[75vw] md:w-auto bg-white md:bg-transparent p-5 md:p-0 rounded-2xl md:rounded-none border md:border-0 border-gray-100 shadow-sm md:shadow-none"
                    >
                      <h4 className="font-bold text-gray-900 mb-1">{f.title}</h4>
                      <p className="text-gray-600 text-sm">{f.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
