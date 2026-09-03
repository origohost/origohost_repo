import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { m as motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { PartnerLogo } from "@/components/partner-logo";
import { buildSeo } from "@/lib/seo";
import { contentLoader } from "@/features/cms";
import { PartnerTrackCard } from "@/features/cms/blocks";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";

const staticMeta = contentLoader.getSync("partners").meta;

/**
 * Route-level error boundary. Renders a rich, actionable diagnostic when the
 * partners CMS content fails reference-order validation in development so the
 * author can see *which* tile drifted and fix it. In production we redact the
 * detail (no leaking internal field paths to end users) and show a generic
 * apology while offering a retry that re-runs the loader.
 */
export function PartnersErrorPage() {
  const router = useRouter();
  return (
    <PageShell
      eyebrow="Partnerships"
      title="Partners are temporarily unavailable"
      description="We couldn't load the partner directory just now. Please try again in a moment."
      breadcrumb={[{ label: "Partners" }]}
    >
      <div className="mx-auto max-w-2xl rounded-3xl border border-[var(--brand-orange)]/30 bg-[var(--brand-cream)] p-8 text-center shadow-[var(--shadow-soft)]">
        <h2 className="text-2xl font-black">Something went wrong</h2>
        <Button
          onClick={() => router.invalidate()}
          className="mt-6 rounded-full bg-gradient-to-r from-[var(--brand-orange)] to-[var(--brand-orange-glow)] px-6 text-white hover:opacity-90"
        >
          Try again
        </Button>
      </div>
    </PageShell>
  );
}

export function PartnersNotFoundPage() {
  return (
    <PageShell
      eyebrow="Partnerships"
      title="Partners not found"
      description="We couldn't find the partners directory."
      breadcrumb={[{ label: "Partners" }]}
    >
      <div className="text-center text-sm text-[var(--brand-ink)]/60">
        <Link to="/" className="underline">
          Return home
        </Link>
      </div>
    </PageShell>
  );
}

export default function PartnersPage() {
  const content = contentLoader.getSync("partners");
  const prefersReducedMotion = useReducedMotion();

  const { data: partners = [] } = useQuery({
    queryKey: queryKeys.partners.list(),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("partners")
        .select("*")
        .eq("published", true)
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data || [];
    },
  });

  const logos = partners.length > 0 ? partners.filter((p) => p.type === "logo") : content.logos;
  const institutes =
    partners.length > 0 ? partners.filter((p) => p.type === "institute") : content.institutes || [];

  const tileInitial = prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 };
  const tileWhileInView = { opacity: 1, y: 0 };
  const tileTransition = (i: number) => ({
    duration: prefersReducedMotion ? 0 : 0.45,
    delay: prefersReducedMotion ? 0 : Math.min(i * 0.03, 0.6),
    ease: [0.2, 0.7, 0.2, 1] as const,
  });
  const headingInitial = prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 };

  return (
    <PageShell
      eyebrow={content.meta.eyebrow ?? "Partnerships"}
      title={
        <>
          Grow with a{" "}
          <span className="bg-gradient-to-r from-[var(--brand-orange)] to-[var(--brand-orange-glow)] bg-clip-text text-transparent">
            nationwide
          </span>{" "}
          hosting community
        </>
      }
      description={content.meta.heroDescription ?? content.meta.description}
      breadcrumb={[{ label: "Partners" }]}
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {content.tracks.map((t, i) => (
          <PartnerTrackCard key={t.title} track={t} index={i} />
        ))}
      </div>

      <section className="mt-16 sm:mt-20">
        <motion.div
          initial={headingInitial}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.5, ease: [0.2, 0.7, 0.2, 1] }}
          className="mb-8 text-center sm:mb-12"
        >
          <h2 className="text-2xl font-black tracking-tight sm:text-3xl lg:text-5xl">
            Our Clientele
          </h2>
        </motion.div>
        <ul
          data-testid="enterprise-grid"
          className="mx-auto grid max-w-6xl grid-cols-2 items-center gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-6 lg:gap-y-12"
          aria-label="Enterprise partners"
        >
          {logos.map((l: any, i: number) => (
            <motion.li
              key={l.name || i}
              initial={tileInitial}
              whileInView={tileWhileInView}
              viewport={{ once: true, amount: 0.2 }}
              transition={tileTransition(i)}
              className="grid h-16 place-items-center logo-hover sm:h-20 lg:h-24"
            >
              <PartnerLogo entry={l} size={140} fallbackTextClassName="text-xs sm:text-sm" />
            </motion.li>
          ))}
        </ul>
      </section>

      {institutes.length > 0 && (
        <section className="mt-20 sm:mt-24">
          <motion.div
            initial={headingInitial}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.5, ease: [0.2, 0.7, 0.2, 1] }}
            className="mb-8 text-center sm:mb-12"
          >
            <h2 className="text-2xl font-black tracking-tight sm:text-3xl lg:text-5xl">
              Partners &amp; Collaborators
            </h2>
          </motion.div>
          <ul
            data-testid="institutes-grid"
            className="mx-auto grid max-w-6xl grid-cols-2 items-center gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-6 lg:gap-y-12"
            aria-label="Institute partners"
          >
            {institutes.map((l: any, i: number) => (
              <motion.li
                key={l.name || i}
                initial={tileInitial}
                whileInView={tileWhileInView}
                viewport={{ once: true, amount: 0.2 }}
                transition={tileTransition(i)}
                className="grid h-16 place-items-center logo-hover sm:h-20 lg:h-24"
              >
                <PartnerLogo entry={l} size={140} fallbackTextClassName="text-xs sm:text-sm" />
              </motion.li>
            ))}
          </ul>
          <motion.p
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.4,
              delay: prefersReducedMotion ? 0 : 0.2,
            }}
            className="mt-8 text-center text-xs text-[var(--brand-ink)]/60 sm:mt-12 sm:text-sm"
          >
            and +150 companies
          </motion.p>
        </section>
      )}

      <div className="mt-16 overflow-hidden rounded-3xl bg-[var(--brand-ink)] p-10 text-white lg:grid lg:grid-cols-2 lg:gap-10">
        <div>
          <h2 className="text-3xl font-black">Ready to partner with OrigoHOST?</h2>
          <p className="mt-4 text-white/70">
            Tell us about your program, audience, and goals. We'll design an outcome-focused
            collaboration tuned to your teams.
          </p>
        </div>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row lg:mt-0 lg:justify-end">
          <Button
            asChild
            className="rounded-full bg-gradient-to-r from-[var(--brand-orange)] to-[var(--brand-orange-glow)] px-7 text-white hover:opacity-90"
          >
            <Link to="/contact">
              Start a partnership <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </PageShell>
  );
}
