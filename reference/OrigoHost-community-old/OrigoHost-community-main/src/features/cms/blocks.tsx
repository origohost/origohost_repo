import React, { useState } from "react";
import { m as motion, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Briefcase, Building2, MapPin, Clock, Camera, Bookmark } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import type {
  EventBlock,
  JobBlock,
  GalleryAlbumBlock,
  PartnerTrackBlock,
  LegalSectionBlock,
} from "./types";
import { Button } from "@/components/ui/button";
import { resolveIcon } from "./icon";

/* ─── Events ─────────────────────────────────────────────────────────── */

export const EventCard = React.memo(function EventCard({
  event,
  index = 0,
}: {
  event: EventBlock;
  index?: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: [0.2, 0.7, 0.2, 1] }}
      whileHover={{ y: -6, rotateX: 1.5, rotateY: -1.5 }}
      style={{ transformPerspective: 1000 }}
      className="group flex flex-col overflow-hidden rounded-3xl border border-[var(--brand-ink)]/5 bg-white shadow-[var(--shadow-soft)] transition-shadow hover:shadow-[var(--shadow-elevated)]"
    >
      <div className="flex items-start gap-4 p-4 sm:p-6">
        <motion.div
          initial={{ scale: 0.6, opacity: 0, rotate: -8 }}
          whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{
            type: "spring",
            stiffness: 340,
            damping: 18,
            delay: index * 0.06 + 0.1,
          }}
          className="grid h-14 w-14 sm:h-16 sm:w-16 shrink-0 place-items-center rounded-2xl bg-[var(--brand-ink)] text-white shadow-md transition-transform group-hover:-rotate-3 group-hover:scale-105"
        >
          <div className="text-center">
            <div className="text-[10px] font-bold tracking-widest text-[var(--brand-orange)]">
              {event.month}
            </div>
            <div className="text-xl sm:text-2xl font-black leading-none">{event.day}</div>
          </div>
        </motion.div>
        <div className="flex-1">
          <span
            className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wider transition-transform group-hover:scale-105 ${
              event.mode === "ONLINE"
                ? "bg-[var(--brand-mint)] text-[var(--brand-green)]"
                : "bg-orange-100 text-[var(--brand-orange)]"
            }`}
          >
            {event.mode}
          </span>
          <h3 className="mt-2 text-base sm:text-lg font-bold leading-tight">{event.title}</h3>
          <div className="mt-2 flex items-center gap-3 text-xs text-[var(--brand-ink)]/60">
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {event.city}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {event.time}
            </span>
          </div>
          {event.description ? (
            <p className="mt-3 text-sm text-[var(--brand-ink)]/70">{event.description}</p>
          ) : null}
        </div>
      </div>
      <div className="mt-auto flex items-center justify-between border-t border-[var(--brand-ink)]/5 px-4 sm:px-6 py-4">
        <span className="text-xs font-medium text-[var(--brand-ink)]/60">{event.category}</span>
        <span className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--brand-orange)] transition-colors group-hover:text-[var(--brand-orange-glow)]">
          View details
          <span
            aria-hidden
            className="inline-block transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </span>
      </div>
    </motion.article>
  );
});

/* ─── Jobs ───────────────────────────────────────────────────────────── */

export function JobCard({ job, index = 0 }: { job: JobBlock; index?: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      className="group flex flex-col gap-4 rounded-3xl border border-[var(--brand-ink)]/5 bg-white p-6 shadow-sm hover:shadow-[var(--shadow-soft)] sm:flex-row sm:items-center"
    >
      <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-[var(--brand-mint)]">
        <Building2 className="h-6 w-6 text-[var(--brand-green)]" />
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-bold">{job.role}</h3>
        <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-[var(--brand-ink)]/60">
          <span className="flex items-center gap-1">
            <Building2 className="h-3 w-3" />
            {job.company}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {job.location}
          </span>
          <span className="flex items-center gap-1">
            <Briefcase className="h-3 w-3" />
            {job.type}
          </span>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {job.tags.map((t: any) => (
            <span
              key={t}
              className="rounded-full bg-[var(--brand-cream)] px-2.5 py-1 text-[11px] font-medium text-[var(--brand-ink)]/70"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
          aria-label={`Bookmark ${job.role}`}
        >
          <Bookmark className="h-4 w-4" />
        </Button>
        <Button
          asChild
          className="rounded-full bg-[var(--brand-ink)] text-white hover:bg-[var(--brand-ink)]/90"
        >
          <Link to="/">Apply</Link>
        </Button>
      </div>
    </motion.article>
  );
}

/* ─── Gallery ────────────────────────────────────────────────────────── */

export function GalleryAlbumCard({
  album,
  index = 0,
}: {
  album: GalleryAlbumBlock;
  index?: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          duration: 0.5,
          delay: index * 0.06,
          ease: [0.2, 0.7, 0.2, 1],
        }}
        whileHover={{ y: -6, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        aria-label={`Open ${album.title} album`}
        className={`group relative aspect-[4/5] overflow-hidden rounded-3xl bg-gradient-to-br ${album.tone} bg-white p-6 text-left shadow-[var(--shadow-soft)] transition-shadow hover:shadow-[var(--shadow-elevated)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-orange)] focus-visible:ring-offset-2`}
      >
        <div className="absolute inset-0 bg-gradient-to-br transition-transform duration-500 group-hover:scale-110" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="relative flex h-full flex-col justify-between">
          <div className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold tracking-wider text-[var(--brand-ink)] transition-transform duration-300 group-hover:-translate-y-0.5">
            <Camera className="h-3 w-3" /> {album.category}
          </div>
          <div className="transition-transform duration-300 group-hover:translate-y-0 translate-y-1">
            <div className="text-xl font-black text-white drop-shadow">{album.title}</div>
            <div className="mt-1 text-xs font-medium text-white/80">{album.count} photos</div>
          </div>
        </div>
      </motion.button>

      <Dialog open={open} onOpenChange={setOpen}>
        <AnimatePresence>
          {open && (
            <DialogContent className="max-w-2xl overflow-hidden border-none bg-transparent p-0 shadow-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 8 }}
                transition={{ duration: 0.28, ease: [0.2, 0.7, 0.2, 1] }}
                className={`relative aspect-[4/3] overflow-hidden rounded-3xl bg-gradient-to-br ${album.tone} p-10 shadow-2xl`}
              >
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="relative flex h-full flex-col justify-end text-white">
                  <div className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold tracking-wider text-[var(--brand-ink)]">
                    <Camera className="h-3.5 w-3.5" /> {album.category}
                  </div>
                  <DialogTitle className="mt-4 text-3xl font-black drop-shadow">
                    {album.title}
                  </DialogTitle>
                  <DialogDescription className="mt-1 text-sm font-medium text-white/85">
                    {album.count} photos · Preview coming soon
                  </DialogDescription>
                </div>
              </motion.div>
            </DialogContent>
          )}
        </AnimatePresence>
      </Dialog>
    </>
  );
}

/* ─── Partners ───────────────────────────────────────────────────────── */

export function PartnerTrackCard({
  track,
  index = 0,
}: {
  track: PartnerTrackBlock;
  index?: number;
}) {
  const Icon = resolveIcon(track.icon);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="rounded-3xl border border-[var(--brand-ink)]/5 bg-white p-8 shadow-[var(--shadow-soft)]"
    >
      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[var(--brand-mint)]">
        <Icon className="h-5 w-5 text-[var(--brand-green)]" />
      </div>
      <h3 className="mt-5 text-xl font-bold">{track.title}</h3>
      <p className="mt-2 text-sm text-[var(--brand-ink)]/70">{track.body}</p>
    </motion.div>
  );
}

/* ─── Legal ──────────────────────────────────────────────────────────── */

export function LegalSectionList({ sections }: { sections: LegalSectionBlock[] }) {
  return (
    <div className="mx-auto max-w-3xl rounded-3xl border border-[var(--brand-ink)]/5 bg-white p-8 shadow-[var(--shadow-soft)] sm:p-12">
      <div className="space-y-8">
        {sections.map((s) => (
          <section key={s.title}>
            <h2 className="text-lg font-bold text-[var(--brand-ink)]">{s.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--brand-ink)]/70">{s.body}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
