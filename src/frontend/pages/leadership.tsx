import { SITE_CONFIG } from "@/config/site";
import { buildSeo } from "@/lib/seo";
import {
  buildFounderSchemaRitik,
  buildFounderSchemaTarun,
  buildOrganizationSchema,
  buildWebPageSchema,
  buildBinarizeSchema,
  buildAadvickSchema,
  buildYennickSchema,
} from "@/lib/structured-data";
import { PageShell } from "@/components/layout/page-shell";
import { Github, Linkedin, Mail, Twitter, Instagram } from "lucide-react";
import { m as motion } from "framer-motion";

export default function LeadershipPage() {
  return (
    <PageShell title="Leadership Team" description="Meet the leadership team behind OrigoHOST.">
      <div className="relative isolate min-h-screen bg-slate-50 pt-24 sm:pt-32 pb-24">
        <section className="mx-auto max-w-7xl px-6 lg:px-8">
          <header className="mx-auto max-w-2xl lg:mx-0">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Our Leadership
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Meet the founders of OrigoHOST. We are a dynamic group of technology entrepreneurs
              passionate about building the most impactful developer and AI community in India.
            </p>
          </header>

          <ul
            role="list"
            className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-2"
          >
            {/* Tarun Kumar */}
            <motion.li
              itemScope
              itemType="https://schema.org/Person"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col h-full"
            >
              <img
                itemProp="image"
                className="mx-auto h-56 w-56 rounded-full object-cover shadow-lg"
                src={`${SITE_CONFIG.url}/tarun-kumar.png`}
                alt="Tarun Kumar, VP at Aadvick Foundation"
                decoding="async"
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://ui-avatars.com/api/?name=Tarun+Kumar&background=0A66C2&color=fff&size=256";
                }}
              />
              <div className="flex-1">
                <h2
                  itemProp="name"
                  className="mt-6 text-2xl font-bold leading-7 tracking-tight text-gray-900 text-center"
                >
                  Tarun Kumar
                </h2>
                <p
                  itemProp="jobTitle"
                  className="text-sm leading-6 text-blue-600 font-semibold text-center mt-1"
                >
                  Vice President of Aadvick Foundation
                </p>
                <p
                  itemProp="description"
                  className="mt-4 text-base leading-7 text-gray-600 text-center"
                >
                  AI Engineer, Technology Entrepreneur. Vice President at Aadvick Foundation.
                </p>
              </div>

              <div className="mt-6 flex justify-center gap-x-4">
                <a
                  href="https://www.linkedin.com/in/iamtarunchaudhary"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid h-8 w-8 place-items-center rounded-full bg-white text-[var(--brand-ink)] shadow transition-transform hover:-translate-y-1 hover:text-[#0A66C2]"
                >
                  <span className="sr-only">LinkedIn</span>
                  <Linkedin className="h-6 w-6" />
                </a>
                <a
                  href="https://www.instagram.com/tarunsinghchdhry"
                  className="grid h-8 w-8 place-items-center rounded-full bg-white text-[var(--brand-ink)] shadow transition-transform hover:-translate-y-1 hover:text-pink-600"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="sr-only">Instagram</span>
                  <Instagram className="h-6 w-6" />
                </a>
              </div>
            </motion.li>

            {/* Ritik Kumar */}
            <motion.li
              itemScope
              itemType="https://schema.org/Person"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col h-full"
            >
              <img
                itemProp="image"
                className="mx-auto h-56 w-56 rounded-full object-cover shadow-lg"
                src={`${SITE_CONFIG.url}/ritik-kumar.jpg`}
                alt="Ritik Kumar, Co-Founder of OrigoHOST"
                decoding="async"
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://ui-avatars.com/api/?name=Ritik+Kumar&background=f97316&color=fff&size=256";
                }}
              />
              <div className="flex-1">
                <h2
                  itemProp="name"
                  className="mt-6 text-2xl font-bold leading-7 tracking-tight text-gray-900 text-center"
                >
                  Ritik Kumar
                </h2>
                <p
                  itemProp="jobTitle"
                  className="text-sm leading-6 text-orange-600 font-semibold text-center mt-1"
                >
                  Co-Founder & Community Director
                </p>
                <p
                  itemProp="description"
                  className="mt-4 text-base leading-7 text-gray-600 text-center"
                >
                  Enterprise SaaS Architect, AI Developer, Technology Entrepreneur, Founder & CEO of
                  Binarize Technologies, and Co-Founder of OrigoHOST. President of Aadvick
                  Foundation and Executive Director of Yennick Pharma.
                </p>
              </div>

              <div className="mt-6 flex justify-center gap-x-4">
                <a
                  href="https://www.linkedin.com/in/codewithritik19/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid h-8 w-8 place-items-center rounded-full bg-white text-[var(--brand-ink)] shadow transition-transform hover:-translate-y-1 hover:text-[#0A66C2]"
                >
                  <span className="sr-only">LinkedIn</span>
                  <Linkedin className="h-6 w-6" />
                </a>
                <a
                  href="https://github.com/codewithritik19"
                  className="text-gray-400 hover:text-black transition-colors"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="sr-only">GitHub</span>
                  <Github className="h-6 w-6" />
                </a>
                <a
                  href="https://twitter.com/codewithritik19"
                  className="text-gray-400 hover:text-[#1DA1F2] transition-colors"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="sr-only">Twitter</span>
                  <Twitter className="h-6 w-6" />
                </a>
              </div>
            </motion.li>
          </ul>
        </section>
      </div>
    </PageShell>
  );
}
