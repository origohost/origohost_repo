import React from 'react';
import type { Metadata } from 'next';
import type { Project } from '@/types';
import Link from 'next/link';
import {
  Terminal, Users, ExternalLink, ArrowRight,
  GitBranch, Sparkles, Shield, Cpu, Layers
} from 'lucide-react';
import { Container, Section } from '@/components/layout';
import { Heading, Text } from '@/components/ui';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/buttons/Button';
import { projects } from '@/data/projects/projects.data';

export const metadata: Metadata = {
  title: 'Open-Source Projects — OrigoHOST Innovation Hub',
  description:
    'Browse open-source software, developer utilities, and experimental tools constructed by participants within the OrigoHOST ecosystem.',
};

const domainIcon: Record<string, React.ElementType> = {
  'Infrastructure & Cloud': Layers,
  'Cybersecurity': Shield,
  'Developer Tooling': Terminal,
  'Artificial Intelligence': Cpu,
  'Community Infrastructure': Users,
};

const statusVariant: Record<string, 'success' | 'warning' | 'primary'> = {
  Active: 'success',
  Experimental: 'warning',
  Archived: 'primary',
};

export default function ProjectsPage() {
  const featuredProjects = projects.filter((p) => p.featured);
  const allProjects = projects;

  return (
    <div className="flex flex-col w-full">
      {/* ── 1. Hero ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28 border-b border-border bg-surface">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
        <Container size="lg" className="relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="origo-eyebrow">Innovation Hub</span>
            </div>
            <h1 className="text-display-md sm:text-display-lg lg:text-display-xl font-extrabold tracking-tight mb-6 font-display text-foreground leading-[1.05]">
              Projects built by the <span className="text-gradient-origo">OrigoHOST community.</span>
            </h1>
            <Text size="lg" variant="secondary" className="leading-relaxed mb-8">
              Open-source software, developer utilities, and experimental tools constructed by builders within the OrigoHOST ecosystem — shipped to GitHub and deployed to real environments.
            </Text>
            <div className="flex flex-wrap gap-4">
              <Button
                href="https://github.com/origohost"
                variant="primary"
                size="lg"
                external
              >
                View on GitHub
                <ExternalLink className="h-4 w-4 ml-1" aria-hidden="true" />
              </Button>
              <Button href="/join?pathway=participant" variant="secondary" size="lg">
                Contribute a Project
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 2. Stats Bar ─────────────────────────────────────────────── */}
      <div className="border-b border-border bg-surface">
        <Container size="lg">
          <div className="grid grid-cols-3 divide-x divide-border py-6">
            {[
              { label: 'Active Projects', value: projects.filter(p => p.status === 'Active').length },
              { label: 'Contributors', value: [...new Set(projects.flatMap(p => p.contributors))].length },
              { label: 'Technology Domains', value: [...new Set(projects.map(p => p.domain))].length },
            ].map(({ label, value }) => (
              <div key={label} className="px-6 first:pl-0 last:pr-0 text-center">
                <span className="block font-display font-bold text-3xl text-ink tabular-nums">{value}</span>
                <span className="text-body-xs text-ink-muted uppercase tracking-wider font-semibold mt-0.5 block">{label}</span>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* ── 3. Featured Projects ─────────────────────────────────────── */}
      <Section spacing="lg" background="default">
        <Container size="lg">
          <div className="max-w-3xl mb-12">
            <span className="text-kicker text-primary uppercase">Flagship Contributions</span>
            <Heading as="h2" size="xl" className="mt-1 mb-3">
              Featured Projects
            </Heading>
            <Text size="md" variant="secondary">
              Priority open-source repositories actively maintained by the OrigoHOST engineering community.
            </Text>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </Container>
      </Section>

      {/* ── 4. All Projects ──────────────────────────────────────────── */}
      <Section spacing="lg" background="surface">
        <Container size="lg">
          <div className="mb-12">
            <span className="text-kicker text-primary uppercase">Full Project Index</span>
            <Heading as="h2" size="xl" className="mt-1 mb-3">
              All Community Projects
            </Heading>
            <Text size="md" variant="secondary">
              Every project, from experimental builds to production-grade utilities.
            </Text>
          </div>

          <div className="divide-y divide-border rounded-card border border-border overflow-hidden bg-surface">
            {allProjects.map((project, idx) => {
              const Icon = domainIcon[project.domain] ?? GitBranch;
              return (
                <div
                  key={project.id}
                  className="flex items-start gap-5 p-5 hover:bg-surface-elevated transition-colors group"
                >
                  <div className="h-10 w-10 rounded-btn bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="font-display font-semibold text-body-md text-ink group-hover:text-primary transition-colors">
                        {project.name}
                      </span>
                      <Badge variant={statusVariant[project.status] ?? 'primary'} className="text-caption">
                        {project.status}
                      </Badge>
                    </div>
                    <p className="text-body-xs text-ink-muted mb-2 leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 text-caption text-ink-muted">
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" aria-hidden="true" />
                        {project.contributors.slice(0, 2).join(', ')}
                        {project.contributors.length > 2 && ` +${project.contributors.length - 2}`}
                      </span>
                      <span className="text-border">•</span>
                      <span>{project.domain}</span>
                    </div>
                  </div>
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${project.name} on GitHub`}
                      className="shrink-0 p-2 rounded-btn text-ink-muted hover:text-primary hover:bg-primary/10 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* ── 5. Contribute CTA ────────────────────────────────────────── */}
      <section className="section-dark py-24 md:py-32 relative overflow-hidden border-t border-border/40 text-center">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
        <Container size="md" className="text-center relative z-10">
          <Badge variant="primary" className="mb-4 !bg-white/10 !text-white !border-white/20">
            Open Contributions
          </Badge>
          <Heading as="h2" size="xl" className="text-white mb-4">
            Ship Something Real.
          </Heading>
          <Text size="lg" className="text-[#B7C2D9] max-w-xl mx-auto mb-8 leading-relaxed">
            Every project in this directory was built by a community participant. Propose a new utility, join an active repository, or start your own with OrigoHOST DevKit scaffolding.
          </Text>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/join?pathway=participant" variant="primary" size="lg">
              Join as a Contributor
              <ArrowRight className="h-4 w-4 ml-1" aria-hidden="true" />
            </Button>
            <Button
              href="https://github.com/origohost"
              variant="secondary"
              size="lg"
              external
              className="!bg-white/10 !text-white !border-white/20 hover:!bg-white/20"
            >
              Browse GitHub Org
              <ExternalLink className="h-4 w-4 ml-1" aria-hidden="true" />
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}

// ── ProjectCard ──────────────────────────────────────────────────────────────
function ProjectCard({ project }: { project: Project }) {
  const Icon = domainIcon[project.domain] ?? GitBranch;
  return (
    <article className="flex flex-col p-6 rounded-card bg-surface border border-border shadow-xs hover:shadow-card hover:border-primary/30 transition-all group">
      <div className="flex items-center justify-between mb-4">
        <div className="h-10 w-10 rounded-btn bg-primary/10 text-primary flex items-center justify-center group-hover:scale-105 transition-transform">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={statusVariant[project.status] ?? 'primary'} className="text-caption">
            {project.status}
          </Badge>
        </div>
      </div>

      <Heading as="h3" size="sm" className="text-ink mb-2 group-hover:text-primary transition-colors">
        {project.name}
      </Heading>

      <Text size="xs" variant="secondary" className="leading-relaxed mb-4 flex-1">
        {project.description}
      </Text>

      {/* Tech stack */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.technologies.slice(0, 3).map((tech) => (
          <span
            key={tech}
            className="px-2 py-0.5 rounded text-caption font-semibold bg-primary/8 text-primary border border-primary/15"
          >
            {tech}
          </span>
        ))}
        {project.technologies.length > 3 && (
          <span className="px-2 py-0.5 rounded text-caption font-semibold text-ink-muted bg-surface-elevated border border-border">
            +{project.technologies.length - 3}
          </span>
        )}
      </div>

      {/* Contributors */}
      <div className="flex items-center gap-1.5 mb-5 text-caption text-ink-muted">
        <Users className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        <span>{project.contributors.slice(0, 2).join(', ')}</span>
      </div>

      {project.url && (
        <div className="pt-4 border-t border-border/50">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-primary font-semibold text-body-sm hover:gap-2 transition-all duration-150 outline-none"
          >
            View Repository
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      )}
    </article>
  );
}
