import React from 'react';
import type { Metadata } from 'next';
import {
  Users, Compass, Award, Milestone, Landmark, GraduationCap,
  CheckCircle2, ArrowRight, ShieldCheck, HeartHandshake
} from 'lucide-react';
import { Container, Section } from '@/components/layout';
import { Heading, Text } from '@/components/ui';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/buttons/Button';
import { JoinForm } from '@/features/join';
import { Accordion } from '@/components/ui/Accordion';

export const metadata: Metadata = {
  title: 'Join OrigoHOST — Participation Pathways & Campus Lead Application',
  description:
    'Choose your participation pathway into the OrigoHOST ecosystem: Participant, Volunteer, Technical Speaker, Mentor, Campus Representative, or Chapter Lead.',
};

export default function JoinPage() {
  const pathways = [
    {
      icon: Users,
      title: 'Ecosystem Participant',
      desc: 'Attend technical webinars (KSS), compete in hackathons like CyberForge, and build collaborative open projects.',
      badge: 'Open Access',
    },
    {
      icon: Compass,
      title: 'Community Volunteer',
      desc: 'Assist regional event operations, session moderation, and peer community support across our digital Discord/Telegram hubs.',
      badge: 'Operations',
    },
    {
      icon: Award,
      title: 'Technical Speaker / Trainer',
      desc: 'Lead architecture masterclasses, live live-coding sessions, and share deep industry engineering lessons.',
      badge: 'Mentorship',
    },
    {
      icon: Milestone,
      title: 'Expert Mentor / Reviewer',
      desc: 'Provide code reviews on student pull requests and mentor hackathon teams on cloud deployment and systems architecture.',
      badge: 'Advisory',
    },
    {
      icon: Landmark,
      title: 'Campus Representative',
      desc: 'Act as the official liaison connecting students and faculty at your university with OrigoHOST hackathons and workshops.',
      badge: 'Campus Node',
    },
    {
      icon: GraduationCap,
      title: 'Chapter Lead / Organizer',
      desc: 'Charter and run an official OrigoHOST Student Chapter on your campus with full curriculum, logistic, and cloud support.',
      badge: 'Leadership',
    },
  ];

  const onboardingSteps = [
    { step: '01', title: 'Submit Pathway Application', desc: 'Select your preferred participation role and share your background and technical motivation.' },
    { step: '02', title: 'Community Review', desc: 'Our operations team reviews submissions within 48 hours and verifies contact details.' },
    { step: '03', title: 'Welcome & Onboarding', desc: 'Receive your official onboarding guide, private community channels access, and orientation schedule.' },
  ];

  const joinFaqs = [
    {
      id: 'join-faq-1',
      title: 'Is there any cost or membership fee associated with joining?',
      content: 'Joining the OrigoHOST community is free. Most community webinars, hackathons, and open-source activities are free, while select specialized masterclasses or advanced compute tracks may be paid based on program requirements.',
    },
    {
      id: 'join-faq-2',
      title: 'Can I apply for multiple pathways at the same time?',
      content: 'We recommend starting with your primary focus (e.g., Campus Representative or Participant). Once onboarded, members frequently expand their roles into speaker or mentor positions.',
    },
    {
      id: 'join-faq-3',
      title: 'What time commitment is required for volunteers and chapter leads?',
      content: 'Volunteers and Campus Representatives typically commit 2 to 4 hours per week during active hackathon or webinar campaign cycles.',
    },
  ];

  return (
    <div className="flex flex-col w-full">
      {/* ── 1. Hero ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28 border-b border-border bg-surface">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
        <Container size="lg" className="relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="origo-eyebrow">Open Intake</span>
            </div>
            <h1 className="text-display-md sm:text-display-lg lg:text-display-xl font-extrabold tracking-tight mb-6 font-display text-foreground leading-[1.05]">
              Choose your pathway into the <span className="text-gradient-origo">builder ecosystem.</span>
            </h1>
            <Text size="lg" variant="secondary" className="leading-relaxed mb-8">
              We have no gated paywalls or vanity subscription tiers. Choose the role that matches your skills and career intent, and join thousands of engineers building across India.
            </Text>
            <div className="flex flex-wrap gap-4">
              <Button href="#apply" variant="primary" size="lg">
                Jump to Application Form
                <ArrowRight className="h-4 w-4 ml-1" aria-hidden="true" />
              </Button>
              <Button href="#pathways" variant="secondary" size="lg">
                Explore Pathways
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 2. Pathways Grid ─────────────────────────────────────────── */}
      <Section spacing="lg" background="default" id="pathways">
        <Container size="lg">
          <div className="max-w-3xl mb-12">
            <span className="text-kicker text-primary uppercase">Participation Tracks</span>
            <Heading as="h2" size="xl" className="mt-1 mb-3">
              Contribution Pathways Explained
            </Heading>
            <Text size="md" variant="secondary">
              We define participation through active contributions rather than passive spectator memberships.
            </Text>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pathways.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className="p-7 rounded-card bg-surface border border-border shadow-xs hover:border-primary/40 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="h-10 w-10 rounded-btn bg-primary/10 text-primary flex items-center justify-center">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <Badge variant="secondary">{p.badge}</Badge>
                    </div>
                    <Heading as="h3" size="sm" className="mb-2">
                      {p.title}
                    </Heading>
                    <Text size="sm" variant="secondary" className="leading-relaxed">
                      {p.desc}
                    </Text>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* ── 3. Onboarding Progression ────────────────────────────────── */}
      <Section spacing="lg" background="surface">
        <Container size="lg">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-kicker text-primary uppercase">What Happens Next</span>
            <Heading as="h2" size="xl" className="mt-1 mb-3">
              The Onboarding Process
            </Heading>
            <Text size="md" variant="secondary">
              A transparent 3-step transition from application to active ecosystem builder.
            </Text>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {onboardingSteps.map((step) => (
              <div
                key={step.step}
                className="p-6 rounded-card bg-surface border border-border shadow-xs flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-primary font-bold text-heading-lg mb-2 block">
                    {step.step}
                  </span>
                  <Heading as="h3" size="sm" className="mb-2">
                    {step.title}
                  </Heading>
                  <Text size="sm" variant="secondary" className="leading-relaxed">
                    {step.desc}
                  </Text>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── 4. Application Form ──────────────────────────────────────── */}
      <Section spacing="lg" background="default" id="apply">
        <Container size="md">
          <div className="p-8 rounded-card bg-surface border border-border shadow-xs">
            <div className="mb-8">
              <span className="text-kicker text-primary uppercase block mb-1">Application Intake</span>
              <Heading as="h2" size="md" className="mb-2">
                Submit Your Pathway Application
              </Heading>
              <Text size="sm" variant="muted">
                Complete the application below. You will receive an immediate confirmation and next steps via email.
              </Text>
            </div>
            <JoinForm />
          </div>
        </Container>
      </Section>

      {/* ── 5. FAQs ──────────────────────────────────────────────────── */}
      <Section spacing="lg" background="surface">
        <Container size="md">
          <div className="text-center mb-12">
            <span className="text-kicker text-primary uppercase">Clarifications</span>
            <Heading as="h2" size="xl" className="mt-1">
              Join & Membership FAQ
            </Heading>
          </div>
          <Accordion items={joinFaqs} allowMultiple />
        </Container>
      </Section>
    </div>
  );
}
