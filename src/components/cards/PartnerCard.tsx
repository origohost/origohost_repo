'use client';

import React from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import type { Partner } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Heading, Body } from '@/components/ui';

interface PartnerCardProps {
  partner: Partner;
}

export function PartnerCard({ partner }: PartnerCardProps) {
  const isReducedMotion = useReducedMotion();

  return (
    <motion.div
      whileHover={isReducedMotion ? {} : { y: -4 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="flex flex-col h-full bg-surface rounded-2xl shadow-card hover:shadow-card-hover border border-brand-deep/[0.06] overflow-hidden p-6 items-center text-center justify-between"
    >
      {/* Partner Logo */}
      <div className="relative w-full aspect-[2/1] max-h-24 bg-surface-secondary flex items-center justify-center p-4 rounded-xl border border-brand-deep/[0.04] mb-4">
        {partner.logo ? (
          <Image
            src={partner.logo}
            alt={`${partner.name} logo`}
            fill
            sizes="180px"
            className="object-contain p-4"
            unoptimized
          />
        ) : (
          <span className="font-display font-bold text-brand-deep/20 text-lg uppercase tracking-tight">
            {partner.name}
          </span>
        )}
      </div>

      {/* Details */}
      <div className="flex flex-col flex-grow items-center w-full justify-between">
        <div>
          <Heading as="h4" size="sm" className="mb-2 text-brand-deep">
            {partner.name}
          </Heading>
          
          <Badge variant="primary" className="mb-4">
            {partner.category}
          </Badge>

          <Body size="sm" className="mb-6 line-clamp-3">
            {partner.description}
          </Body>
        </div>

        {/* Relationship Roles */}
        {partner.relationshipRole.length > 0 && (
          <div className="flex flex-wrap gap-1 justify-center mt-auto">
            {partner.relationshipRole.map((role) => (
              <span
                key={role}
                className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold tracking-wide uppercase bg-brand-electric/5 text-brand-electric"
              >
                {role}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
