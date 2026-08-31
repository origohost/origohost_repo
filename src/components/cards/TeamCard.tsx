'use client';

import React from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { Linkedin, Twitter, Github, Globe } from 'lucide-react';
import type { TeamMember } from '@/types';
import { Heading, Text } from '@/components/ui';

export interface TeamCardProps {
  member: TeamMember;
}

export function TeamCard({ member }: TeamCardProps) {
  const isReducedMotion = useReducedMotion();

  return (
    <motion.div
      whileHover={isReducedMotion ? {} : { y: -3 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col h-full bg-surface rounded-card shadow-card hover:shadow-card-hover border border-border overflow-hidden p-6 text-center items-center transition-all duration-200"
    >
      {/* Avatar Container */}
      <div className="relative w-28 h-28 rounded-full overflow-hidden mb-5 bg-surface-elevated border-2 border-primary/20">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display font-bold text-ink-muted/30 text-xl select-none">
            {member.name.split(' ').map((n) => n[0]).join('')}
          </span>
        </div>

        <Image
          src={member.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=300'}
          alt={member.name}
          fill
          sizes="112px"
          className="object-cover"
          unoptimized
        />
      </div>

      {/* Member Details */}
      <div className="flex flex-col flex-grow items-center w-full">
        <Heading as="h3" size="sm" className="mb-1 text-ink">
          {member.name}
        </Heading>

        <span className="text-body-xs font-semibold uppercase tracking-wider text-primary block mb-3">
          {member.role}
        </span>

        <Text size="sm" variant="secondary" className="mb-6 line-clamp-4 text-center leading-relaxed">
          {member.biography}
        </Text>

        {/* Social Profile Links */}
        <div className="flex items-center gap-2 mt-auto pt-4 border-t border-border/50 w-full justify-center">
          {member.approvedLinks.linkedin && (
            <a
              href={member.approvedLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-ink-muted hover:text-primary rounded-btn hover:bg-surface-elevated transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label={`${member.name} LinkedIn Profile`}
            >
              <Linkedin className="h-4 w-4" aria-hidden="true" />
            </a>
          )}
          {member.approvedLinks.github && (
            <a
              href={member.approvedLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-ink-muted hover:text-primary rounded-btn hover:bg-surface-elevated transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label={`${member.name} GitHub Profile`}
            >
              <Github className="h-4 w-4" aria-hidden="true" />
            </a>
          )}
          {member.approvedLinks.twitter && (
            <a
              href={member.approvedLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-ink-muted hover:text-primary rounded-btn hover:bg-surface-elevated transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label={`${member.name} Twitter Profile`}
            >
              <Twitter className="h-4 w-4" aria-hidden="true" />
            </a>
          )}
          {member.approvedLinks.website && (
            <a
              href={member.approvedLinks.website}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-ink-muted hover:text-primary rounded-btn hover:bg-surface-elevated transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label={`${member.name} Personal Website`}
            >
              <Globe className="h-4 w-4" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
