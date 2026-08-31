'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { Calendar, MapPin, Monitor, ArrowRight } from 'lucide-react';
import type { Event } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { formatDate } from '@/lib/utils';

export interface EventCardProps {
  event: Event;
}

const deliveryIcons = {
  Online:  <Monitor className="h-3.5 w-3.5" aria-hidden="true" />,
  Offline: <MapPin  className="h-3.5 w-3.5" aria-hidden="true" />,
  Hybrid:  <MapPin  className="h-3.5 w-3.5" aria-hidden="true" />,
};

const deliveryColors: Record<string, 'info' | 'success' | 'warning'> = {
  Online:  'info',
  Offline: 'success',
  Hybrid:  'warning',
};

const bannerGradients: Record<string, string> = {
  Hackathon: 'linear-gradient(135deg, #020817 0%, #431407 50%, #FF7316 100%)',
  Workshop:  'linear-gradient(135deg, #071225 0%, #9A3412 100%)',
  Webinar:   'linear-gradient(135deg, #020817 0%, #FF8F33 100%)',
  Meetup:    'linear-gradient(135deg, #020817 0%, #431407 100%)',
  Bootcamp:  'linear-gradient(135deg, #020817 0%, #9A3412 100%)',
  default:   'linear-gradient(135deg, #020817 0%, #FF7316 100%)',
};

export function EventCard({ event }: EventCardProps) {
  const isReducedMotion = useReducedMotion();
  const [imageError, setImageError] = React.useState(false);
  const banner = bannerGradients[event.format] ?? bannerGradients.default;

  let statusLabel = event.status as string;
  let statusVariant: 'primary' | 'success' | 'warning' | 'info' = 'info';

  if (event.status === 'Upcoming') {
    statusLabel = 'Registration Open';
    statusVariant = 'success';
  } else if (event.status === 'Ongoing') {
    statusLabel = 'Ongoing';
    statusVariant = 'warning';
  } else if (event.status === 'Past') {
    statusLabel = 'Completed';
    statusVariant = 'info';
  } else if (event.status === 'Cancelled') {
    statusLabel = 'Cancelled';
    statusVariant = 'primary';
  }

  return (
    <motion.div
      whileHover={isReducedMotion ? {} : { y: -3 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col h-full bg-white dark:bg-surface rounded-card border border-[#E2E8F0] dark:border-border overflow-hidden shadow-xs hover:border-primary/40 transition-all duration-200"
    >
      {/* ── Cover / Banner ───────────────────────────────────────────── */}
      <div className="relative aspect-[16/9] overflow-hidden bg-surface-elevated">
        <div
          className="absolute inset-0 opacity-90"
          style={{ background: banner }}
        />

        {event.coverImage && !imageError && (
          <Image
            src={event.coverImage}
            alt={event.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-102"
            onError={() => setImageError(true)}
            unoptimized
          />
        )}

        {(imageError || !event.coverImage) && (
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <span className="font-display font-extrabold text-white/30 text-2xl md:text-3xl select-none tracking-tight text-center uppercase">
              {event.format}
            </span>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-1.5">
          <Badge variant="primary" className="!bg-black/60 !text-white !border-white/20 backdrop-blur-md">
            {event.format}
          </Badge>
          <Badge variant={deliveryColors[event.delivery]} className="!bg-black/60 !text-white !border-white/20 backdrop-blur-md">
            {event.delivery}
          </Badge>
          <Badge variant={statusVariant} className="!bg-black/60 !text-white !border-white/20 backdrop-blur-md">
            {statusLabel}
          </Badge>
        </div>
      </div>

      {/* ── Content ──────────────────────────────────────────────────── */}
      <div className="flex flex-col flex-grow p-5">
        <div className="flex items-center gap-2 mb-2.5">
          <span className="text-kicker text-ink-muted uppercase">{event.type}</span>
          <span className="text-ink-muted/40">·</span>
          <div className="flex items-center gap-1 text-ink-muted text-body-xs">
            <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{formatDate(event.startDate)}</span>
          </div>
        </div>

        <Link href={`/events/${event.slug}`} className="group/title block mb-2 outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xs">
          <h3 className="font-display font-bold text-heading-md line-clamp-2 text-ink group-hover/title:text-primary transition-colors duration-150">
            {event.title}
          </h3>
        </Link>

        <p className="text-body-sm text-ink-secondary line-clamp-2 mb-5 flex-grow leading-relaxed">
          {event.summary}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3.5 border-t border-border/60 mt-auto">
          <div className="flex items-center gap-1.5 text-ink-muted text-body-xs">
            {deliveryIcons[event.delivery]}
            <span className="truncate max-w-[140px]">{event.location.name}</span>
          </div>
          <Link
            href={`/events/${event.slug}`}
            className="inline-flex items-center gap-1 text-primary font-semibold text-body-sm hover:gap-1.5 transition-all duration-150 outline-none focus-visible:ring-1 focus-visible:ring-primary rounded-xs"
          >
            Details
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
