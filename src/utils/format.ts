/**
 * Pure formatting helpers. Keep framework-free.
 */

export function formatDate(input: Date | string | number, locale = "en-US") {
  return new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(new Date(input));
}

export function formatNumber(value: number, locale = "en-US") {
  return new Intl.NumberFormat(locale).format(value);
}

export function truncate(input: string, max = 120) {
  return input.length > max ? `${input.slice(0, max - 1)}…` : input;
}
