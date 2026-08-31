import React from 'react';
import type { Metadata } from 'next';
import { Mail, MapPin, Globe, Clock, ShieldCheck, MessageSquare } from 'lucide-react';
import { Container, Section } from '@/components/layout';
import { Heading, Text } from '@/components/ui';
import { Badge } from '@/components/ui/Badge';
import { ContactForm } from '@/features/contact';
import { Accordion } from '@/components/ui/Accordion';

export const metadata: Metadata = {
  title: 'Contact OrigoHOST — Institutional, Speaker & General Inquiries',
  description:
    'Get in touch with the OrigoHOST ecosystem team. Route inquiries for college chapter charters, event sponsorships, speaker proposals, and technical support.',
};

export default function ContactPage() {
  const offices = [
    {
      city: 'Noida (Operations HQ)',
      address: 'Noida, Uttar Pradesh, India',
      role: 'Core Operations & Institutional Affairs',
    },
  ];

  const contactFaqs = [
    {
      id: 'contact-faq-1',
      title: 'How long does it take to receive a response?',
      content: 'Our team reviews and routes inquiries within 1 to 2 business days. Hackathon and speaker proposals receive expedited review.',
    },
    {
      id: 'contact-faq-2',
      title: 'Can we schedule a direct video call with leadership?',
      content: 'Yes. For institutional MoUs, university chapter charters, or corporate sponsorships, our team will provide a calendar link following the initial intake review.',
    },
    {
      id: 'contact-faq-3',
      title: 'Where can I find press and brand assets?',
      content: 'High-resolution logo marks, brand guidelines, and official executive biographies are available through our Resources library or upon request.',
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
              <span className="origo-eyebrow">Direct Communication</span>
            </div>
            <h1 className="text-display-md sm:text-display-lg lg:text-display-xl font-extrabold tracking-tight mb-6 font-display text-foreground leading-[1.05]">
              Connect with the OrigoHOST <span className="text-gradient-origo">ecosystem.</span>
            </h1>
            <Text size="lg" variant="secondary" className="leading-relaxed mb-8">
              Whether you are an institution seeking a student chapter charter, a sponsor evaluating hackathon tracks, or a developer with technical feedback — route your inquiry directly to our stewards.
            </Text>
          </div>
        </Container>
      </section>

      {/* ── 2. Contact Form & Info Grid ──────────────────────────────── */}
      <Section spacing="lg" background="default">
        <Container size="lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Form Column */}
            <div className="lg:col-span-7 p-8 rounded-card bg-surface border border-border shadow-xs">
              <div className="mb-8">
                <span className="text-kicker text-primary uppercase block mb-1">Inquiry Form</span>
                <Heading as="h2" size="md" className="mb-2">
                  Send a Message
                </Heading>
                <Text size="sm" variant="muted">
                  Required fields are marked with an asterisk (*). All submissions are processed securely.
                </Text>
              </div>
              <ContactForm />
            </div>

            {/* Information Column */}
            <div className="lg:col-span-5 space-y-6">
              {/* Ecosystem Location */}
              <div className="p-7 rounded-card bg-surface border border-border shadow-xs">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-9 w-9 rounded-btn bg-primary/10 text-primary flex items-center justify-center">
                    <MapPin className="h-4.5 w-4.5" aria-hidden="true" />
                  </div>
                  <Heading as="h3" size="sm">
                    Ecosystem Headquarters
                  </Heading>
                </div>
                {offices.map((office) => (
                  <div key={office.city} className="space-y-1">
                    <span className="font-display font-bold text-body-md text-ink block">
                      {office.city}
                    </span>
                    <span className="text-caption font-mono uppercase tracking-wider text-primary block">
                      {office.role}
                    </span>
                    <Text size="sm" variant="secondary">
                      {office.address}
                    </Text>
                  </div>
                ))}
              </div>

              {/* Digital Channels */}
              <div className="p-7 rounded-card bg-surface border border-border shadow-xs">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-9 w-9 rounded-btn bg-primary/10 text-primary flex items-center justify-center">
                    <Globe className="h-4.5 w-4.5" aria-hidden="true" />
                  </div>
                  <Heading as="h3" size="sm">
                    Direct Channels
                  </Heading>
                </div>
                <div className="space-y-3 text-body-sm">
                  <div>
                    <span className="text-caption font-mono uppercase text-ink-muted block">General & Community:</span>
                    <a href="mailto:hello@origohost.com" className="text-primary font-medium hover:underline">
                      hello@origohost.com
                    </a>
                  </div>
                  <div>
                    <span className="text-caption font-mono uppercase text-ink-muted block">Institutional & Sponsorship:</span>
                    <a href="mailto:partners@origohost.com" className="text-primary font-medium hover:underline">
                      partners@origohost.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Response SLA */}
              <div className="p-7 rounded-card bg-surface border border-border shadow-xs">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="h-4.5 w-4.5 text-primary" aria-hidden="true" />
                  <Heading as="h3" size="sm">
                    Operating Response SLA
                  </Heading>
                </div>
                <Text size="sm" variant="secondary" className="leading-relaxed">
                  Communications are monitored Monday through Friday, 9:00 AM – 6:00 PM IST. Hackathon and emergency chapter operations receive 24/7 coverage during live broadcast windows.
                </Text>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── 3. Contact FAQ ───────────────────────────────────────────── */}
      <Section spacing="lg" background="surface">
        <Container size="md">
          <div className="text-center mb-12">
            <span className="text-kicker text-primary uppercase">Assistance</span>
            <Heading as="h2" size="xl" className="mt-1">
              Contact & Routing FAQ
            </Heading>
          </div>
          <Accordion items={contactFaqs} allowMultiple />
        </Container>
      </Section>
    </div>
  );
}
