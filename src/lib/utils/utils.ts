import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges Tailwind CSS classes with clsx support.
 * Use this for all conditional class composition in components.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Format a date string to a human-readable format.
 * e.g. "2026-08-28" → "28 August 2026"
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/**
 * Format a date range.
 * If start and end are same month → "10–12 June 2026"
 * If different months → "30 July – 2 August 2026"
 */
export function formatDateRange(start: string, end?: string): string {
  if (!end) return formatDate(start);
  const s = new Date(start);
  const e = new Date(end);
  const sameMonth = s.getMonth() === e.getMonth() && s.getFullYear() === e.getFullYear();
  if (sameMonth) {
    return `${s.getDate()}–${e.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}`;
  }
  return `${s.toLocaleDateString('en-IN', { day: 'numeric', month: 'long' })} – ${e.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}`;
}

/**
 * Truncate text to a given character limit.
 */
export function truncate(text: string, limit: number): string {
  if (text.length <= limit) return text;
  return text.slice(0, limit).trimEnd() + '…';
}

/**
 * Slugify a string.
 * e.g. "Knowledge Sharing Series" → "knowledge-sharing-series"
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}
