import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight, Sparkles, Check, Cpu, Globe, Users, Terminal, Shield,
  BookOpen, Layers, Zap, Building2, HelpCircle, Award, Compass, Server
} from 'lucide-react';
import { Button } from '@/components/buttons/Button';
import { Container, Section } from '@/components/layout';
import { Badge } from '@/components/ui/Badge';
import { EventCard } from '@/components/cards/EventCard';
import { ProgramCard } from '@/components/cards/ProgramCard';
import { ResourceCard } from '@/components/cards/ResourceCard';
import { getFeaturedEvents } from '@/services/events/events.service';
import { getFeaturedPrograms } from '@/services/content/programs.service';
import { getFeaturedResources } from '@/services/content/resources.service';
import { getFeaturedArticles } from '@/services/content/articles.service';
import { getPartners } from '@/services/content/partners.service';
import { stories } from '@/data/stories/stories.data';

export const metadata: Metadata = {
  title: 'OrigoHOST — Empowering India’s Developer Ecosystem',
  description:
    'OrigoHOST is India’s premier developer community and infrastructure platform, bridging academic learning with real-world software engineering, cloud compute, and production systems.',
};

export default async function HomePage() {
  const featuredEvents = await getFeaturedEvents(3);
  const featuredPrograms = await getFeaturedPrograms(2);
  const featuredResources = await getFeaturedResources(2);
  const featuredArticles = await getFeaturedArticles(2);
  const allPartners = await getPartners();
  const activePartners = allPartners.slice(0, 4);

  const builderStages = [
    { step: '01', title: 'Learn', desc: 'Master practical systems engineering and modern software development standards.' },
    { step: '02', title: 'Explore', desc: 'Discover emerging technologies through interactive, expert-led technical sessions.' },
    { step: '03', title: 'Connect', desc: 'Engage with motivated developer peers, industry mentors, and project collaborators.' },
    { step: '04', title: 'Collaborate', desc: 'Work alongside peer developers to contribute to active open-source initiatives.' },
    { step: '05', title: 'Build', desc: 'Develop and deploy functional software applications using modern cloud environments.' },
    { step: '06', title: 'Solve', desc: 'Participate in CyberForge hackathons to address real-world engineering challenges.' },
    { step: '07', title: 'Lead', desc: 'Establish and guide an official OrigoHOST Student Chapter at your university.' },
    { step: '08', title: 'Innovate', desc: 'Transform validated software prototypes into impactful, scalable projects.' },
    { step: '09', title: 'Guide', desc: 'Share your knowledge as a technical mentor or speaker for upcoming cohorts.' },
  ];

  const verifiedMetrics = [
    { value: '3,000+', label: 'Active Community Members', detail: 'Students, software engineers, and technology builders across India' },
    { value: '20+', label: 'Workshops & Hackathons', detail: 'Hands-on learning sessions, webinars, and build competitions' },
    { value: '10+', label: 'University Chapters', detail: 'Chartered student communities empowering local developer ecosystems' },
    { value: '2', label: 'Flagship Initiatives', detail: 'Knowledge Sharing Series (KSS) & AI Foundation Program' },
  ];

  const platformPillars = [
    {
      icon: Server,
      title: 'Cloud Compute Infrastructure',
      desc: 'Access real compute sandboxes, database instances, and automated deployment pipelines engineered for practical learning.',
    },
    {
      icon: Users,
      title: 'Peer Developer Network',
      desc: 'Connect with thousands of student developers, open-source contributors, and co-builders across university campuses.',
    },
    {
      icon: BookOpen,
      title: 'Industry-Aligned Cohorts',
      desc: 'Master full-stack architecture, cloud systems, and AI fundamentals through structured, expert-guided programs.',
    },
    {
      icon: Award,
      title: 'Career & Venture Launchpad',
      desc: 'Transform hackathon prototypes into production software and gain direct visibility with top technology hiring partners.',
    },
  ];

  const faqItems = [
    {
      q: 'What is OrigoHOST and who can join?',
      a: 'OrigoHOST is an enterprise-grade developer ecosystem and infrastructure platform in India. It is open to engineering students, software developers, campus community leaders, and industry professionals eager to learn, build, and deploy production-ready systems.',
    },
    {
      q: 'How do campus chapters work and how can I charter one at my college?',
      a: 'Campus chapters are student-led developer hubs operating under an official OrigoHOST charter. Chapter leads receive complete event toolkits, workshop curricula, cloud resources, and guidance from the OrigoHOST team to run technical activities on campus.',
    },
    {
      q: 'Are OrigoHOST learning programs and masterclasses free for students?',
      a: 'Yes, our flagship educational cohorts (such as the Knowledge Sharing Series) and open webinars are completely free for verified community members and university students.',
    },
    {
      q: 'What is CyberForge and how do hackathons work on OrigoHOST?',
      a: 'CyberForge is our national hackathon and buildathon series. Developers team up to solve real-world problem statements provided by industry partners, using OrigoHOST cloud infrastructure to build and present working software.',
    },
    {
      q: 'How can companies and technology organizations partner with OrigoHOST?',
      a: 'Enterprise partners can sponsor hackathons, provide API credentials/cloud credits, host guest technical masterclasses, and recruit pre-vetted developer talent directly through our ecosystem pipelines.',
    },
    {
      q: 'How do I access developer sandboxes and deployment tools?',
      a: 'Once registered on the OrigoHOST platform, active community members receive sandbox access keys and deployment guides within their developer dashboard.',
    },
  ];

  const mainArticle = featuredArticles[0];
  const secondaryArticle = featuredArticles[1];

  return (
    <div className="flex flex-col w-full overflow-hidden bg-background text-foreground">
      {/* ── 01. Ecosystem Hero Section ────────────────────────────────── */}
      <section className="relative overflow-hidden pt-24 pb-28 md:pt-32 md:pb-36 bg-gradient-to-b from-[#FFF7ED]/90 via-background to-background dark:from-[#020817] dark:via-[#071225] dark:to-[#0B1628] border-b border-border/60">
        <div className="absolute inset-0 origo-grid opacity-20 pointer-events-none" />
        
        {/* Glow ambient Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-brand-primary/10 dark:bg-brand-primary/15 rounded-full blur-3xl pointer-events-none" />

        <Container size="lg" className="relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-primary/10 dark:bg-brand-primary/20 border border-brand-primary/25 text-brand-primary font-mono text-body-xs font-bold mb-6">
              <Sparkles className="h-3.5 w-3.5" />
              EMPOWERING THE NEXT GENERATION OF SOFTWARE BUILDERS & INNOVATORS
            </div>

            <h1 className="text-display-md sm:text-display-lg lg:text-display-xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 leading-[1.05] text-balance font-display">
              Build Boldly. Connect Globally. <br />
              <span className="bg-gradient-to-r from-[#FF7316] via-[#FF8F33] to-[#EA580C] dark:from-[#FF7316] dark:via-[#FF8F33] dark:to-[#FDBA74] bg-clip-text text-transparent">
                Launch Production-Ready Systems.
              </span>
            </h1>

            <p className="text-body-lg sm:text-body-xl mb-4 leading-relaxed text-slate-700 dark:text-slate-200 max-w-3xl mx-auto text-pretty font-normal">
              Welcome to OrigoHOST—India&apos;s premier developer ecosystem and cloud infrastructure platform designed to bridge the gap between classroom theory and real-world software engineering.
            </p>
            
            <p className="text-body-md sm:text-body-lg mb-10 leading-relaxed text-slate-600 dark:text-slate-300 max-w-3xl mx-auto text-pretty font-normal">
              Whether you are a student discovering systems design, a developer building open-source tools, or a campus leader cultivating tech talent, OrigoHOST provides the hands-on compute sandboxes, structured learning cohorts, and collaborative community network you need to turn ambitious ideas into deployed, production-ready software.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
              <Button href="/join" variant="primary" size="lg" className="shadow-brand-lg">
                Join the Developer Community
                <ArrowRight className="h-4 w-4 ml-1.5" aria-hidden="true" />
              </Button>
              <Button
                href="/programs"
                variant="secondary"
                size="lg"
                className="border border-slate-300 dark:border-border bg-white dark:bg-slate-800 text-slate-800 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-700 shadow-xs"
              >
                Explore Cohorts & Programs
              </Button>
            </div>

            {/* Feature Badges Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-slate-200/80 dark:border-border/40 text-caption font-mono font-bold text-slate-600 dark:text-slate-400">
              <div className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-white/60 dark:bg-slate-900/60 border border-slate-200/60 dark:border-border/40">
                <Check className="h-4 w-4 text-brand-primary" /> Enterprise Sandboxes
              </div>
              <div className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-white/60 dark:bg-slate-900/60 border border-slate-200/60 dark:border-border/40">
                <Check className="h-4 w-4 text-brand-primary" /> 3,000+ Active Builders
              </div>
              <div className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-white/60 dark:bg-slate-900/60 border border-slate-200/60 dark:border-border/40">
                <Check className="h-4 w-4 text-brand-primary" /> Chartered Chapters
              </div>
              <div className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-white/60 dark:bg-slate-900/60 border border-slate-200/60 dark:border-border/40">
                <Check className="h-4 w-4 text-brand-primary" /> CyberForge Hackathons
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 02. Core Platform Pillars Grid ────────────────────────────── */}
      <section className="py-20 bg-white dark:bg-[#020817] border-b border-border/60 relative">
        <Container size="lg">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="origo-eyebrow mb-3 text-brand-primary">WHY ORIGOHOST</span>
            <h2 className="text-display-sm md:text-display-md font-bold tracking-tight font-display text-foreground">
              Everything You Need to Build & Scale
            </h2>
            <p className="text-body-md text-foreground-muted mt-3">
              Designed from the ground up to empower software builders with real tools, collaborative networks, and institutional backing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {platformPillars.map((p, idx) => {
              const IconComp = p.icon;
              return (
                <div key={idx} className="origo-card p-8 rounded-2xl bg-surface flex flex-col justify-between group">
                  <div>
                    <div className="h-12 w-12 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <IconComp className="h-6 w-6" />
                    </div>
                    <h4 className="text-heading-md font-bold mb-3 text-foreground">{p.title}</h4>
                    <p className="text-body-sm text-foreground-muted leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ── 03. Primary Audience Segmentation (Pathways) ─────────────── */}
      <section className="py-16 md:py-24 border-b border-border/60 bg-surface-soft">
        <Container size="lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="origo-card p-8 flex flex-col justify-between group">
              <div>
                <span className="origo-eyebrow mb-3">
                  {'// FOR DEVELOPERS'}
                </span>
                <h3 className="text-heading-lg font-bold mb-3 text-foreground">
                  Students & Engineers
                </h3>
                <p className="text-body-md text-foreground-muted mb-6 leading-relaxed">
                  Gain hands-on software engineering experience, access cloud development environments, and collaborate with peers on real-world projects.
                </p>
              </div>
              <Link href="/join" className="text-body-sm font-bold text-brand-primary group-hover:translate-x-1 transition-transform inline-flex items-center gap-1.5">
                Explore Developer Hub <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="origo-card p-8 flex flex-col justify-between group">
              <div>
                <span className="origo-eyebrow mb-3 text-brand-orange">
                  {'// FOR COMMUNITY LEADERS'}
                </span>
                <h3 className="text-heading-lg font-bold mb-3 text-foreground">
                  Campus Leads & Mentors
                </h3>
                <p className="text-body-md text-foreground-muted mb-6 leading-relaxed">
                  Establish an official OrigoHOST chapter at your institution, host practical technical workshops, and empower emerging tech talent.
                </p>
              </div>
              <Link href="/community" className="text-body-sm font-bold text-brand-primary group-hover:translate-x-1 transition-transform inline-flex items-center gap-1.5">
                Join Community Network <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="origo-card p-8 flex flex-col justify-between group">
              <div>
                <span className="origo-eyebrow mb-3 text-foreground-subtle">
                  {'// FOR INSTITUTIONS'}
                </span>
                <h3 className="text-heading-lg font-bold mb-3 text-foreground">
                  Partners & Enterprise Sponsors
                </h3>
                <p className="text-body-md text-foreground-muted mb-6 leading-relaxed">
                  Engage high-caliber student developers, support flagship hackathons, and collaborate on technical education initiatives.
                </p>
              </div>
              <Link href="/partners" className="text-body-sm font-bold text-brand-primary group-hover:translate-x-1 transition-transform inline-flex items-center gap-1.5">
                Partner With Us <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Container>
      </section>


      {/* ── 05. Verified Impact Metrics ───────────────────────────────── */}
      <section className="py-20 md:py-28 bg-[#FFFFFF] dark:bg-[#020817] border-y border-[#E2E8F0] dark:border-border/60 relative overflow-hidden">
        <div className="origo-orb top-10 left-10 opacity-15" />
        <Container size="lg" className="relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="origo-eyebrow mb-3 text-brand-primary">
              ECOSYSTEM REACH
            </span>
            <h2 className="text-display-md text-foreground tracking-tight font-display font-bold">
              Our Impact Across the Community
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {verifiedMetrics.map((m, idx) => (
              <div key={idx} className="origo-card p-8 rounded-2xl text-center bg-white dark:bg-[#07101F] border border-[#E2E8F0] dark:border-border/60 shadow-xs">
                <span className="block text-display-lg font-black text-brand-primary mb-2 font-display">
                  {m.value}
                </span>
                <span className="block text-heading-md font-bold text-foreground mb-2">
                  {m.label}
                </span>
                <span className="block text-body-xs text-foreground-subtle leading-relaxed">
                  {m.detail}
                </span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 06. Structured Programs & Cohorts ─────────────────────────── */}
      <Section spacing="lg" background="default">
        <Container size="lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <span className="origo-eyebrow mb-3">
                LEARNING & GROWTH PATHWAYS
              </span>
              <h2 className="text-display-sm md:text-display-md font-bold tracking-tight mb-6 font-display">
                Structured Programs Designed for Every Stage of Your Journey
              </h2>
              <p className="text-body-lg text-foreground-muted mb-8 leading-relaxed">
                OrigoHOST provides clear, guided pathways tailored to your goals—whether you are mastering new technologies, leading a student community, or partnering to support technological innovation.
              </p>
              <Button href="/join" variant="primary" size="lg" className="shadow-brand">
                Get Started With OrigoHOST
              </Button>
            </div>
            
            <div className="lg:col-span-7 space-y-6">
              <div className="origo-card p-7 flex gap-6 items-start">
                <div className="h-11 w-11 shrink-0 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center font-bold text-heading-md">1</div>
                <div>
                  <h4 className="text-heading-lg font-bold mb-2 text-foreground">For Aspiring Software Engineers</h4>
                  <p className="text-body-md text-foreground-muted leading-relaxed">
                    Build practical expertise in cloud computing and software design while building a standout portfolio of real-world applications.
                  </p>
                </div>
              </div>

              <div className="origo-card p-7 flex gap-6 items-start">
                <div className="h-11 w-11 shrink-0 rounded-xl bg-brand-orange/10 text-brand-orange flex items-center justify-center font-bold text-heading-md">2</div>
                <div>
                  <h4 className="text-heading-lg font-bold mb-2 text-foreground">For Campus Chapter Leaders & Volunteers</h4>
                  <p className="text-body-md text-foreground-muted leading-relaxed">
                    Lead tech initiatives at your university with dedicated resources, workshop toolkits, and ongoing support from the OrigoHOST team.
                  </p>
                </div>
              </div>

              <div className="origo-card p-7 flex gap-6 items-start">
                <div className="h-11 w-11 shrink-0 rounded-xl bg-brand-peach/20 text-brand-burnt flex items-center justify-center font-bold text-heading-md">3</div>
                <div>
                  <h4 className="text-heading-lg font-bold mb-2 text-foreground">For Industry Partners & Sponsors</h4>
                  <p className="text-body-md text-foreground-muted leading-relaxed">
                    Connect with talented student engineers, sponsor CyberForge hackathons, and contribute to industry-aligned learning programs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── 07. Active Flagship Programs ─────────────────────────────── */}
      <Section spacing="lg" background="surface">
        <Container size="lg">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-14 gap-4">
            <div>
              <span className="origo-eyebrow mb-2">FEATURED INITIATIVES</span>
              <h2 className="text-display-sm md:text-display-md font-bold tracking-tight font-display">
                Our Active Programs
              </h2>
            </div>
            <Button href="/programs" variant="secondary" size="md">
              View All Programs
              <ArrowRight className="h-4 w-4 ml-1.5" aria-hidden="true" />
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredPrograms.map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </div>
        </Container>
      </Section>

      {/* ── 08. Live Community Calendar (Events) ─────────────────────── */}
      {featuredEvents.length > 0 && (
        <Section spacing="lg" background="default">
          <Container size="lg">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-14 gap-4">
              <div>
                <span className="origo-eyebrow mb-2">UPCOMING EVENTS & WORKSHOPS</span>
                <h2 className="text-display-sm md:text-display-md font-bold tracking-tight font-display">
                  Participate in Our Next Technical Session
                </h2>
              </div>
              <Button href="/events" variant="secondary" size="md">
                View Event Calendar
                <ArrowRight className="h-4 w-4 ml-1.5" aria-hidden="true" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* ── 09. Actionable Opportunities (Ways to Participate) ────────── */}
      <Section spacing="lg" background="surface">
        <Container size="lg">
          <div className="max-w-2xl mb-14">
            <span className="origo-eyebrow mb-2">OPPORTUNITIES</span>
            <h2 className="text-display-sm md:text-display-md font-bold tracking-tight font-display">
              Ways to Get Involved
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="origo-card p-8 flex flex-col justify-between">
              <div>
                <Badge variant="primary" className="mb-4">Chapters</Badge>
                <h4 className="text-heading-lg font-bold mb-3 text-foreground">Campus Chapter Leadership</h4>
                <p className="text-body-md text-foreground-muted leading-relaxed mb-6">
                  Establish an official student chapter at your university, receive mentorship and event support, and cultivate a thriving developer community on campus.
                </p>
              </div>
              <Button href="/join" variant="secondary" size="sm">
                Apply for Chapter Leadership
              </Button>
            </div>

            <div className="origo-card p-8 flex flex-col justify-between">
              <div>
                <Badge variant="success" className="mb-4">Volunteering</Badge>
                <h4 className="text-heading-lg font-bold mb-3 text-foreground">Community Volunteering</h4>
                <p className="text-body-md text-foreground-muted leading-relaxed mb-6">
                  Help organize interactive masterclasses, assist with hackathon operations, and contribute to open-source developer tools.
                </p>
              </div>
              <Button href="/join" variant="secondary" size="sm">
                Join as Volunteer
              </Button>
            </div>

            <div className="origo-card p-8 flex flex-col justify-between">
              <div>
                <Badge variant="warning" className="mb-4">Mentorship</Badge>
                <h4 className="text-heading-lg font-bold mb-3 text-foreground">Technical Mentorship</h4>
                <p className="text-body-md text-foreground-muted leading-relaxed mb-6">
                  Share your professional insights, review student projects, and guide aspiring software engineers toward industry success.
                </p>
              </div>
              <Button href="/join" variant="secondary" size="sm">
                Become a Mentor
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── 10. Tech Intelligence & Feed ──────────────────────────────── */}
      <Section spacing="lg" background="default" id="insights">
        <Container size="lg">
          <div className="flex items-center justify-between mb-14">
            <div>
              <span className="origo-eyebrow mb-2">COMMUNITY KNOWLEDGE</span>
              <h2 className="text-display-sm md:text-display-md font-bold tracking-tight font-display">
                Technical Insights & Articles
              </h2>
            </div>
            <Link href="/blog" className="text-body-sm font-bold text-brand-primary hover:underline inline-flex items-center gap-1.5">
              Read All Articles <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Featured Article Spotlight */}
            {mainArticle && (
              <div className="lg:col-span-8 origo-card p-7 flex flex-col md:flex-row gap-7">
                {mainArticle.featuredImage && (
                  <div className="relative w-full md:w-1/2 aspect-[16/10] rounded-xl overflow-hidden bg-surface-soft shrink-0">
                    <Image
                      src={mainArticle.featuredImage}
                      alt={mainArticle.title}
                      fill
                      sizes="380px"
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                )}
                <div className="flex flex-col justify-between py-1">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="primary">{mainArticle.category}</Badge>
                      <span className="text-caption font-mono text-foreground-subtle">{mainArticle.publishedAt}</span>
                    </div>
                    <h3 className="text-heading-xl font-bold mb-3 text-foreground hover:text-brand-primary transition-colors">
                      <Link href={`/blog/${mainArticle.slug}`}>{mainArticle.title}</Link>
                    </h3>
                    <p className="text-body-md text-foreground-muted line-clamp-3 mb-4 leading-relaxed">
                      {mainArticle.excerpt}
                    </p>
                  </div>
                  {mainArticle.author && (
                    <div className="flex items-center gap-2 text-caption font-mono text-foreground-subtle">
                      <span className="font-bold text-foreground">{mainArticle.author.name}</span>
                      {mainArticle.author.role && (
                        <>
                          <span>·</span>
                          <span>{mainArticle.author.role}</span>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Sidebar Feed & Ecosystem Tags */}
            <div className="lg:col-span-4 space-y-6">
              <div className="origo-card p-7">
                <h4 className="text-heading-md font-bold mb-4">Ecosystem Topics</h4>
                <div className="flex flex-wrap gap-2">
                  {['Cloud', 'AI/ML', 'Open Source', 'DevOps', 'Cybersecurity', 'Tutorials'].map((tag) => (
                    <span key={tag} className="px-3 py-1 text-caption font-mono font-medium rounded-lg bg-background-soft border border-border text-foreground-muted hover:text-brand-primary cursor-pointer hover:border-brand-primary/30 transition-colors">
                      #{tag.toUpperCase()}
                    </span>
                  ))}
                </div>
              </div>

              {secondaryArticle && (
                <div className="origo-card p-7">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="info">{secondaryArticle.category}</Badge>
                    <span className="text-caption font-mono text-foreground-subtle">{secondaryArticle.publishedAt}</span>
                  </div>
                  <h4 className="text-heading-md font-bold mb-3 text-foreground hover:text-brand-primary transition-colors">
                    <Link href={`/blog/${secondaryArticle.slug}`}>{secondaryArticle.title}</Link>
                  </h4>
                  <Link href={`/blog/${secondaryArticle.slug}`} className="text-body-sm font-bold text-brand-primary hover:underline inline-flex items-center gap-1">
                    Read Post <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </Container>
      </Section>

      {/* ── 11. Curated Developer Resources ──────────────────────────── */}
      <Section spacing="lg" background="surface">
        <Container size="lg">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-14 gap-4">
            <div>
              <span className="origo-eyebrow mb-2">LEARNING RESOURCES</span>
              <h2 className="text-display-sm md:text-display-md font-bold tracking-tight font-display">
                Curated Developer Guides & Tools
              </h2>
            </div>
            <Button href="/resources" variant="secondary" size="md">
              View All Resources
              <ArrowRight className="h-4 w-4 ml-1.5" aria-hidden="true" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredResources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </Container>
      </Section>

      {/* ── 12. Featured Partners & Sponsors ──────────────────────────── */}
      <section className="py-20 md:py-28 bg-[#F7F8FA] dark:bg-[#020817] border-y border-border/60 relative overflow-hidden">
        <Container size="lg" className="relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="origo-eyebrow mb-3 text-brand-primary">OUR COLLABORATORS</span>
            <h2 className="text-display-md text-foreground tracking-tight font-display font-bold">
              Valued Partners & Sponsors
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="origo-card p-8 rounded-2xl bg-surface">
              <h4 className="text-heading-md font-bold text-brand-primary mb-4 font-mono tracking-wide uppercase">
                {'// TECHNOLOGY PARTNERS'}
              </h4>
              <ul className="space-y-3 text-body-md text-foreground-muted font-medium">
                <li className="flex items-center gap-2.5"><Check className="h-4 w-4 text-brand-primary" /> Supabase Database</li>
                <li className="flex items-center gap-2.5"><Check className="h-4 w-4 text-brand-primary" /> Vercel Host Platforms</li>
                <li className="flex items-center gap-2.5"><Check className="h-4 w-4 text-brand-primary" /> GitHub Campus Program</li>
              </ul>
            </div>

            <div className="origo-card p-8 rounded-2xl bg-surface">
              <h4 className="text-heading-md font-bold text-brand-orange mb-4 font-mono tracking-wide uppercase">
                {'// ACADEMIC INSTITUTIONS'}
              </h4>
              <ul className="space-y-3 text-body-md text-foreground-muted font-medium">
                <li className="flex items-center gap-2.5"><Check className="h-4 w-4 text-brand-orange" /> Leading Technology Institutes</li>
                <li className="flex items-center gap-2.5"><Check className="h-4 w-4 text-brand-orange" /> Delhi Technological University</li>
                <li className="flex items-center gap-2.5"><Check className="h-4 w-4 text-brand-orange" /> NIET Chapter Alliance</li>
              </ul>
            </div>

            <div className="origo-card p-8 rounded-2xl bg-surface">
              <h4 className="text-heading-md font-bold text-foreground-subtle mb-4 font-mono tracking-wide uppercase">
                {'// INDUSTRY SPONSORS'}
              </h4>
              <ul className="space-y-3 text-body-md text-foreground-muted font-medium">
                <li className="flex items-center gap-2.5"><Check className="h-4 w-4 text-foreground-subtle" /> CyberForge Industry Sponsors</li>
                <li className="flex items-center gap-2.5"><Check className="h-4 w-4 text-foreground-subtle" /> OrigoHOST Cloud Compute Hubs</li>
                <li className="flex items-center gap-2.5"><Check className="h-4 w-4 text-foreground-subtle" /> National Hackathon Panels</li>
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 13. Signature Framework: Community Build Stages ───────────── */}
      <Section spacing="lg" background="default">
        <Container size="lg">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="origo-eyebrow mb-3">THE DEVELOPER JOURNEY</span>
            <h2 className="text-display-md font-bold tracking-tight font-display text-balance">
              Community Learning & Growth Stages
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {builderStages.slice(0, 9).map((stage) => (
              <div key={stage.step} className="origo-card p-8 flex flex-col justify-between bg-surface">
                <div>
                  <span className="font-mono text-caption font-bold text-brand-primary block mb-3">STAGE {stage.step}</span>
                  <h4 className="text-heading-xl font-bold mb-2 text-foreground">{stage.title}</h4>
                  <p className="text-body-md text-foreground-muted leading-relaxed">
                    {stage.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── 14. Builder Testimonials & Stories ────────────────────────── */}
      <Section spacing="lg" background="surface">
        <Container size="lg">
          <div className="max-w-3xl mb-14">
            <span className="origo-eyebrow mb-2">COMMUNITY TESTIMONIALS</span>
            <h2 className="text-display-sm md:text-display-md font-bold tracking-tight font-display">
              Voices From Our Community
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {stories.slice(0, 2).map((story, idx) => (
              <div key={idx} className="origo-card p-8 flex flex-col justify-between bg-surface">
                <p className="text-body-lg text-foreground-muted italic leading-relaxed mb-8">
                  &ldquo;{story.story}&rdquo;
                </p>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-brand-primary/10 flex items-center justify-center font-bold text-brand-primary text-heading-md shrink-0">
                    {story.name[0]}
                  </div>
                  <div>
                    <span className="block text-heading-sm font-bold text-foreground">{story.name}</span>
                    <span className="block text-body-xs text-foreground-subtle">
                      {story.role} {story.chapterName ? `· ${story.chapterName}` : ''}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── 15. Frequently Asked Questions (FAQ) Section ─────────────── */}
      <Section spacing="lg" background="default" id="faq">
        <Container size="lg">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="origo-eyebrow mb-3 text-brand-primary">FREQUENTLY ASKED QUESTIONS</span>
            <h2 className="text-display-md font-bold tracking-tight font-display text-foreground">
              Everything You Need to Know
            </h2>
            <p className="text-body-md text-foreground-muted mt-3">
              Got questions about joining, chartering a chapter, or participating in events? We have answers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {faqItems.map((item, idx) => (
              <div key={idx} className="origo-card p-8 rounded-2xl bg-surface flex flex-col justify-between">
                <div>
                  <h4 className="text-heading-md font-bold text-foreground mb-3 flex items-start gap-2.5">
                    <HelpCircle className="h-5 w-5 text-brand-primary shrink-0 mt-0.5" />
                    {item.q}
                  </h4>
                  <p className="text-body-sm text-foreground-muted leading-relaxed pl-7">
                    {item.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── 16. High-Impact Final Call to Action ─────────────────────── */}
      <section className="py-28 md:py-36 bg-[#07101F] text-white border-t border-white/10 relative overflow-hidden text-center">
        <div className="origo-orb top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-25" />

        <Container size="md" className="relative z-10">
          <span className="origo-eyebrow mb-4 text-brand-primary justify-center">
            JOIN THE ORIGOHOST ECOSYSTEM
          </span>
          <h2 className="text-display-lg md:text-display-xl font-extrabold text-white mb-6 tracking-tight font-display text-balance">
            Ready to Build the Future of Software?
          </h2>
          <p className="text-body-lg sm:text-body-xl text-[#cbd5e1] max-w-xl mx-auto mb-10 leading-relaxed text-pretty">
            Join thousands of passionate student developers, campus chapter leads, and industry mentors collaborating across India. Access deployment resources, attend expert masterclasses, and ship production-grade code.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/join" variant="primary" size="lg" className="shadow-brand-lg">
              Join OrigoHOST Today
              <ArrowRight className="h-4 w-4 ml-2" aria-hidden="true" />
            </Button>
            <Button
              href="/contact"
              variant="secondary"
              size="lg"
              className="!bg-white/10 !text-white !border-white/20 hover:!bg-white/20"
            >
              Contact Community Team
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
