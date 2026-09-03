import { Link } from "@tanstack/react-router";
import { m as motion } from "framer-motion";
import { useState } from "react";
import type { PersonBlock } from "@/features/cms/types";
import {
  Sparkles,
  Target,
  Rocket,
  Users,
  Heart,
  Lightbulb,
  Shield,
  Globe,
  Handshake,
  Award,
  Trophy,
  GraduationCap,
  Building2,
  Landmark,
  Calendar,
  Camera,
  Linkedin,
  Twitter,
  Mail,
  Github,
  ArrowUpRight,
  ArrowRight,
  Quote,
  Code2,
  Gift,
  ChevronDown,
  Facebook,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { buildSeo } from "@/lib/seo";
import { buildOrganizationSchema, buildWebPageSchema } from "@/lib/structured-data";
import { getInitials } from "@/lib/initials";
import { contentLoader } from "@/features/cms";
import { Button } from "@/components/ui/button";
import { InstagramIcon } from "@/components/icons";
import {
  BackgroundOrbs,
  Counter,
  Tilt,
  Magnetic,
  SpotlightCard,
  Stagger,
} from "@/components/motion/primitives";

/**
 * Parses a display value like "90K+" or "2030" or "1M+" into
 * `{ value, prefix, suffix }` so <Counter /> can animate the numeric portion.
 */
function parseStat(raw: string): { value: number; prefix: string; suffix: string } {
  const match = raw.match(/^([^\d-]*)(-?[\d.,]+)\s*([KMBk+m%]*.*)$/);
  if (!match) return { value: 0, prefix: "", suffix: raw };
  const [, prefix, numStr, suffix] = match;
  const num = Number(numStr.replace(/,/g, ""));
  return { value: Number.isFinite(num) ? num : 0, prefix, suffix };
}

const ICONS: Record<string, React.ElementType> = {
  Sparkles,
  Target,
  Rocket,
  Users,
  Heart,
  Lightbulb,
  Shield,
  Globe,
  Handshake,
  Award,
  Trophy,
  GraduationCap,
  Building2,
  Landmark,
  Calendar,
  Camera,
  Linkedin,
  Twitter,
  Mail,
  Github,
  InstagramIcon,
  Facebook,
};

const ACCENT: Record<string, { bg: string; fg: string }> = {
  orange: { bg: "bg-orange-100", fg: "text-[var(--brand-orange)]" },
  green: { bg: "bg-[var(--brand-mint)]", fg: "text-[var(--brand-green)]" },
  yellow: { bg: "bg-yellow-100", fg: "text-yellow-600" },
  blue: { bg: "bg-blue-100", fg: "text-blue-600" },
  purple: { bg: "bg-purple-100", fg: "text-purple-600" },
};

const about = contentLoader.getSync("about");
const foundersContent = contentLoader.getSync("founders");

function FounderAvatar({ founder }: { founder: any }) {
  const [errored, setErrored] = useState(false);
  const initials = getInitials(founder.name);
  const showImage = Boolean(founder.avatarUrl) && !errored;
  return (
    <div className="relative mx-auto mt-8 h-40 w-40 sm:h-48 sm:w-48">
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: "linear-gradient(135deg, var(--brand-orange) 0%, var(--brand-green) 100%)",
        }}
      />
      <div className="absolute inset-1.5 overflow-hidden rounded-full bg-white shadow-xl ring-4 ring-white">
        {showImage ? (
          <img
            loading="lazy"
            decoding="async"
            src={founder.avatarUrl}
            alt={`${founder.name} — ${founder.role}`}
            onError={() => setErrored(true)}
            className={`h-full w-full object-cover ${founder.name.includes("Tarun") ? "object-top" : "object-center"}`}
          />
        ) : (
          <div
            role="img"
            aria-label={`${founder.name} — ${founder.role}`}
            className="grid h-full w-full place-items-center bg-gradient-to-br from-[var(--brand-cream)] to-white text-4xl font-black text-[var(--brand-ink)]"
          >
            {initials}
          </div>
        )}
      </div>
    </div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-ink)] px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-white">
      <Sparkles className="h-3 w-3 text-[var(--brand-yellow)]" />
      {children}
    </div>
  );
}

function Icon({ name, className }: { name?: string; className?: string }) {
  const C = (name && ICONS[name]) || Sparkles;
  return <C className={className} />;
}

const PurposeItem = ({ p, idx }: { p: any; idx: number }) => {
  const a = ACCENT[p.accent as keyof typeof ACCENT];
  const [isOpen, setIsOpen] = useState(idx === 0);
  return (
    <Tilt
      max={5}
      className="h-full rounded-3xl border border-[var(--brand-ink)]/5 bg-white p-6 lg:p-8 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-elevated)]"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-left lg:cursor-default lg:hidden"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-4">
          <div className={`grid h-12 w-12 place-items-center rounded-2xl ${a.bg}`}>
            <p.icon className={`h-5 w-5 ${a.fg}`} />
          </div>
          <h3 className="text-xl font-black">{p.title}</h3>
        </div>
        <ChevronDown className={`h-5 w-5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <div className="hidden lg:flex items-center gap-4">
        <div className={`grid h-14 w-14 place-items-center rounded-2xl ${a.bg}`}>
          <p.icon className={`h-6 w-6 ${a.fg}`} />
        </div>
        <h3 className="text-2xl font-black">{p.title}</h3>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 lg:!max-h-[500px] lg:!opacity-100 ${isOpen ? "max-h-[500px] opacity-100 mt-6 lg:mt-6" : "max-h-0 opacity-0 mt-0 lg:mt-6"}`}
      >
        <p className="text-sm leading-relaxed text-[var(--brand-ink)]/70">{p.body}</p>
        <div className="mt-8 grid grid-cols-2 gap-6 border-t border-[var(--brand-ink)]/5 pt-6">
          {p.stats.map((s: any, i: number) => (
            <div key={s.label}>
              <div className="text-3xl font-black tracking-tight">{s.value}</div>
              <div className="mt-1 text-xs font-medium uppercase tracking-wider text-[var(--brand-ink)]/50">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Tilt>
  );
};

const ValueItem = ({ v, i }: { v: any; i: number }) => {
  const a = ACCENT[(v.accent as keyof typeof ACCENT) ?? "orange"];
  const [isOpen, setIsOpen] = useState(i === 0);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: i * 0.04 }}
      className="rounded-3xl border border-[var(--brand-ink)]/5 bg-white p-6 lg:p-8 shadow-[var(--shadow-soft)] snap-center shrink-0 w-[85vw] sm:w-auto"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-left lg:cursor-default lg:hidden"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-4">
          <div className={`grid h-12 w-12 place-items-center rounded-2xl ${a.bg}`}>
            <v.icon className={`h-5 w-5 ${a.fg}`} />
          </div>
          <h3 className="text-xl font-black">{v.title}</h3>
        </div>
        <ChevronDown className={`h-5 w-5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <div className="hidden lg:flex items-center gap-4">
        <div className={`grid h-14 w-14 place-items-center rounded-2xl ${a.bg}`}>
          <v.icon className={`h-6 w-6 ${a.fg}`} />
        </div>
        <h3 className="text-2xl font-black">{v.title}</h3>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 lg:!max-h-[500px] lg:!opacity-100 ${isOpen ? "max-h-[500px] opacity-100 mt-6 lg:mt-6" : "max-h-0 opacity-0 mt-0 lg:mt-6"}`}
      >
        <p className="text-sm leading-relaxed text-[var(--brand-ink)]/70">{v.body}</p>
      </div>
    </motion.div>
  );
};

export default function AboutPage() {
  return (
    <div className="bg-[var(--brand-cream)] text-[var(--brand-ink)]">
      {/* HERO */}
      <section id="about-header" data-testid="about-header" className="relative overflow-hidden">
        <div className="absolute inset-0 -z-20" style={{ background: "var(--gradient-hero)" }} />
        <BackgroundOrbs className="-z-10" />
        <div className="absolute inset-0 -z-10 noise-overlay" aria-hidden />
        <div className="mx-auto max-w-5xl px-6 pb-20 pt-32 text-center sm:pt-40 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Pill>{about.meta.eyebrow}</Pill>
            <h1 className="mt-6 text-6xl font-black leading-[1.05] tracking-tighter sm:text-7xl md:text-8xl">
              About{" "}
              <span className="bg-gradient-to-r from-[var(--brand-orange)] to-[var(--brand-orange-glow)] bg-clip-text text-transparent">
                Origo
              </span>
              <span className="bg-gradient-to-r from-[var(--brand-green)] to-[var(--brand-green-glow)] bg-clip-text text-transparent">
                HOST
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-[var(--brand-ink)]/70">
              {about.meta.heroDescription}
            </p>
          </motion.div>
        </div>
      </section>

      {/* FOUNDERS — feature two co-founders */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mb-14 text-center">
            <Pill>Meet the Founders</Pill>
            <h2 className="mt-6 text-5xl font-black tracking-tighter sm:text-6xl">
              The people behind{" "}
              <span className="bg-gradient-to-r from-[var(--brand-orange)] to-[var(--brand-orange-glow)] bg-clip-text text-transparent">
                the movement
              </span>
            </h2>
          </div>

          <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 -mx-4 px-4 lg:mx-0 lg:px-0 lg:pb-8 lg:grid lg:grid-cols-2 hide-scrollbar">
            {foundersContent.profiles.map((f, i) => (
              <motion.article
                key={f.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="group relative snap-center shrink-0 w-[90vw] lg:w-auto"
              >
                <div className="relative h-full overflow-hidden rounded-3xl border border-[var(--brand-ink)]/10 bg-white p-8 lg:p-10 text-center shadow-[var(--shadow-soft)] transition-all duration-300 hover:shadow-[var(--shadow-elevated)] hover:-translate-y-1">
                  {/* Founder Badge */}
                  {f.badge && (
                    <div className="absolute right-6 top-6 flex items-center gap-2 rounded-full bg-[var(--brand-cream)] px-3 py-1.5 text-[10px] font-bold tracking-widest text-[var(--brand-ink)] shadow-sm">
                      <Sparkles className="h-3 w-3 text-[var(--brand-orange)]" />
                      {f.badge.toUpperCase()}
                    </div>
                  )}

                  <FounderAvatar founder={f} />

                  <h3 className="mt-6 text-3xl font-black tracking-tight">{f.name}</h3>
                  <p className="mt-1 text-sm font-bold text-[var(--brand-green)]">{f.role}</p>

                  <div className="mt-3 flex justify-center items-center gap-1.5 text-[11px] font-semibold tracking-wider text-[var(--brand-ink)]/50 uppercase">
                    <Calendar className="h-3 w-3" /> Community Since {f.communitySince}
                  </div>

                  {f.quote && (
                    <blockquote className="relative mx-auto mt-6 max-w-xl rounded-2xl border border-[var(--brand-ink)]/5 bg-gray-50 p-5 text-left transition-colors group-hover:bg-[var(--brand-cream)]">
                      <Quote className="absolute right-4 top-4 h-8 w-8 text-[var(--brand-orange)]/15" />
                      <p className="text-sm italic leading-relaxed text-[var(--brand-ink)]/80">
                        "{f.quote}"
                      </p>
                    </blockquote>
                  )}

                  {/* Expertise Chips */}
                  {f.expertiseChips && (
                    <div className="mt-6 flex flex-wrap justify-center gap-2">
                      {f.expertiseChips.map((chip: string) => (
                        <span
                          key={chip}
                          className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600 transition-colors group-hover:bg-blue-50 group-hover:text-blue-700"
                        >
                          {chip}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Stats Row */}
                  <div className="mt-6 flex justify-center divide-x divide-gray-200 border-t border-b border-gray-100 py-4">
                    <div className="px-4 text-center">
                      <div className="text-xl font-black text-[var(--brand-orange)]">
                        {f.eventsLed}
                      </div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                        Events Led
                      </div>
                    </div>
                    <div className="px-4 text-center">
                      <div className="text-xl font-black text-[var(--brand-green)]">
                        {f.achievementsCount}
                      </div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                        Awards
                      </div>
                    </div>
                    <div className="px-4 text-center">
                      <div className="text-xl font-black text-blue-600">{f.projectsCount}</div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                        Projects
                      </div>
                    </div>
                  </div>

                  {/* Community Impact */}
                  {f.communityImpact && (
                    <div className="mt-5 text-xs text-gray-500 leading-relaxed max-w-sm mx-auto">
                      <strong>Impact:</strong> {f.communityImpact}
                    </div>
                  )}

                  {f.links && (
                    <div className="mt-6 flex items-center justify-center gap-2">
                      {f.links.map((l: any) => (
                        <a
                          key={l.label}
                          href={l.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={l.label}
                          className="grid h-10 w-10 place-items-center rounded-full bg-gray-50 text-[var(--brand-ink)]/70 shadow-sm transition-all hover:scale-110 hover:bg-[var(--brand-ink)] hover:text-white"
                        >
                          <Icon name={l.icon} className="h-4 w-4" />
                        </a>
                      ))}
                    </div>
                  )}

                  {/* View Full Profile CTA */}
                  <div className="mt-8 pt-4">
                    <Button
                      asChild
                      variant="default"
                      className="w-full sm:w-auto rounded-xl bg-[var(--brand-ink)] text-white hover:bg-[var(--brand-ink)]/90 shadow-lg group-hover:shadow-[var(--brand-orange)]/20 transition-all"
                    >
                      <Link to="/founders/$slug" params={{ slug: f.slug || "" }}>
                        View Executive Profile{" "}
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* PURPOSE — mission + vision */}
      <section className="bg-[var(--brand-cream)] py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mb-14 text-center">
            <Pill>Our Purpose</Pill>
            <h2 className="mt-6 text-5xl font-black tracking-tighter sm:text-6xl">
              Driving Infra Innovation{" "}
              <span className="bg-gradient-to-r from-[var(--brand-orange)] to-[var(--brand-orange-glow)] bg-clip-text text-transparent">
                in India
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[var(--brand-ink)]/70">{about.storyBody}</p>
          </div>

          <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 -mx-4 px-4 sm:mx-0 sm:px-0 sm:pb-0 sm:grid lg:grid-cols-2 hide-scrollbar">
            {[
              { icon: Target, accent: "orange" as const, ...about.purpose.mission },
              { icon: Rocket, accent: "green" as const, ...about.purpose.vision },
            ].map((p, idx) => (
              <div key={p.title} className="snap-center shrink-0 w-[85vw] sm:w-auto h-full">
                <PurposeItem p={p} idx={idx} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="mb-14 text-center">
            <Pill>Our Timeline</Pill>
            <h2 className="mt-6 text-5xl font-black tracking-tighter sm:text-6xl">
              From spark to{" "}
              <span className="bg-gradient-to-r from-[var(--brand-green)] to-[var(--brand-green-glow)] bg-clip-text text-transparent">
                nationwide movement
              </span>
            </h2>
          </div>

          <div className="relative">
            <div className="absolute left-6 top-0 h-full w-0.5 bg-gradient-to-b from-[var(--brand-orange)] via-[var(--brand-yellow)] to-[var(--brand-green)] md:left-1/2 md:-translate-x-1/2" />
            <ol className="space-y-8">
              {about.timeline.map((t, i) => {
                const a = ACCENT[t.accent ?? "orange"];
                const left = i % 2 === 0;
                return (
                  <motion.li
                    key={t.year}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className={`relative grid gap-4 md:grid-cols-2 ${left ? "" : "md:[&>div:first-child]:col-start-2"}`}
                  >
                    <div
                      className={`ml-14 md:ml-0 ${left ? "md:pr-16 md:text-right" : "md:pl-16"}`}
                    >
                      <div className="rounded-3xl border border-[var(--brand-ink)]/5 bg-[var(--brand-cream)] p-6 shadow-sm">
                        <span
                          className={`inline-block rounded-full ${a.bg} px-3 py-1 text-xs font-bold ${a.fg}`}
                        >
                          {t.year}
                        </span>
                        <h3 className="mt-3 text-xl font-black">{t.title}</h3>
                        <p className="mt-2 text-sm text-[var(--brand-ink)]/70">{t.body}</p>
                      </div>
                    </div>
                    <span
                      className={`absolute left-6 top-6 grid h-12 w-12 -translate-x-1/2 place-items-center rounded-full bg-white shadow-lg ring-2 ring-[var(--brand-cream)] md:left-1/2`}
                    >
                      <Icon name={t.icon} className={`h-5 w-5 ${a.fg}`} />
                    </span>
                  </motion.li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="bg-[var(--brand-cream)] py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mb-14 text-center">
            <Pill>What Drives Us</Pill>
            <h2 className="mt-6 text-5xl font-black tracking-tighter sm:text-6xl">
              What Drives Us{" "}
              <span className="bg-gradient-to-r from-[var(--brand-orange)] via-[var(--brand-orange-glow)] to-[var(--brand-green)] bg-clip-text text-transparent">
                Forward
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[var(--brand-ink)]/70">
              The principles that guide every decision we make at OrigoHOST.
            </p>
          </div>

          <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 -mx-4 px-4 sm:mx-0 sm:px-0 sm:pb-0 sm:grid md:grid-cols-2 lg:grid-cols-3 hide-scrollbar">
            {about.values.map((v, i) => (
              <ValueItem key={v.title} v={v} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* NUMBERS */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mb-14 text-center">
            <Pill>Numbers That Inspire</Pill>
            <h2 className="mt-6 text-5xl font-black tracking-tighter sm:text-6xl">
              Numbers That{" "}
              <span className="bg-gradient-to-r from-[var(--brand-orange)] to-[var(--brand-orange-glow)] bg-clip-text text-transparent">
                Inspire
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[var(--brand-ink)]/70">
              The measurable impact we've created in India's infra ecosystem.
            </p>
          </div>

          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-8 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:overflow-visible hide-scrollbar">
            {about.numbers.map((s, i) => {
              const tones = [
                { bg: "bg-orange-100", fg: "text-[var(--brand-orange)]", icon: Users },
                {
                  bg: "bg-[var(--brand-mint)]",
                  fg: "text-[var(--brand-green)]",
                  icon: GraduationCap,
                },
                { bg: "bg-yellow-100", fg: "text-yellow-600", icon: Calendar },
                { bg: "bg-red-100", fg: "text-red-500", icon: Trophy },
                { bg: "bg-blue-100", fg: "text-blue-600", icon: Landmark },
                { bg: "bg-[var(--brand-mint)]", fg: "text-emerald-600", icon: Building2 },
              ];
              const t = tones[i % tones.length];
              const parsed = parseStat(s.value);
              return (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.04 }}
                  className="w-[85vw] shrink-0 snap-center sm:w-auto sm:shrink"
                >
                  <Tilt className="rounded-3xl border border-[var(--brand-ink)]/5 bg-[var(--brand-cream)] p-8 text-center shadow-sm hover-lift">
                    <div
                      className={`mx-auto grid h-14 w-14 place-items-center rounded-2xl ${t.bg} animate-float`}
                      style={{ animationDelay: `${i * 0.3}s` }}
                    >
                      <t.icon className={`h-6 w-6 ${t.fg}`} />
                    </div>
                    <div className={`mt-5 text-4xl font-black ${t.fg}`}>
                      <Counter value={parsed.value} prefix={parsed.prefix} suffix={parsed.suffix} />
                    </div>
                    <div className="mt-2 text-sm font-bold">{s.label}</div>
                    {s.caption && (
                      <div className="mt-1 text-xs text-[var(--brand-ink)]/50">{s.caption}</div>
                    )}
                  </Tilt>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* GET INVOLVED */}
      <section className="bg-[var(--brand-cream)] py-24">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <Pill>Get Involved</Pill>
          <h2 className="mt-6 text-5xl font-black tracking-tighter sm:text-6xl">
            Ready to Shape India's{" "}
            <span className="bg-gradient-to-r from-[var(--brand-orange)] to-[var(--brand-orange-glow)] bg-clip-text text-transparent">
              Infra Future?
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[var(--brand-ink)]/70">
            Whether you're a student, operator, or organization, there's a place for you in India's
            largest hosting community.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {about.ctas.map((c) =>
              c.variant === "primary" ? (
                <Magnetic key={c.label}>
                  <Button
                    asChild
                    size="lg"
                    className="rounded-full bg-gradient-to-r from-[var(--brand-orange)] to-[var(--brand-orange-glow)] px-8 text-white shadow-lg hover:opacity-90"
                  >
                    <Link to={c.href}>
                      {c.label} <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </Magnetic>
              ) : (
                <Magnetic key={c.label}>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="rounded-full border-[var(--brand-ink)]/20 bg-white px-8 hover:bg-white/80"
                  >
                    <Link to={c.href}>{c.label}</Link>
                  </Button>
                </Magnetic>
              ),
            )}
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-3">
            {[
              {
                icon: Users,
                title: "Join Community",
                body: "Connect with 90,000+ operators on Discord & WhatsApp.",
                accent: "orange" as const,
                to: "/register",
              },
              {
                icon: Calendar,
                title: "Attend Events",
                body: "Workshops, hackathons & meetups happening near you.",
                accent: "green" as const,
                to: "/events",
              },
              {
                icon: Handshake,
                title: "Partner With Us",
                body: "Collaborate on hiring, campus programs & innovation.",
                accent: "blue" as const,
                to: "/partners",
              },
            ].map((c) => {
              const a = ACCENT[c.accent];
              return (
                <Tilt max={5} key={c.title}>
                  <SpotlightCard className="group h-full rounded-3xl border border-[var(--brand-ink)]/5 bg-white p-6 text-left shadow-sm transition-shadow hover:shadow-[var(--shadow-soft)]">
                    <Link to={c.to} className="block h-full">
                      <div className={`grid h-12 w-12 place-items-center rounded-2xl ${a.bg}`}>
                        <c.icon className={`h-5 w-5 ${a.fg}`} />
                      </div>
                      <h3 className="mt-5 text-lg font-bold">{c.title}</h3>
                      <p className="mt-2 text-sm text-[var(--brand-ink)]/70">{c.body}</p>
                      <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--brand-orange)]">
                        Learn more{" "}
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </Link>
                  </SpotlightCard>
                </Tilt>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
