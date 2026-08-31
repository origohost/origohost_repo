import { faqs } from '@/data/faq/faq.data';
import type { FAQItem, FAQCategory } from '@/types';

export async function getFAQs(category?: FAQCategory | string): Promise<FAQItem[]> {
  if (!category || category === 'All') {
    return faqs;
  }
  return faqs.filter((faq) => faq.category.toLowerCase() === category.toLowerCase());
}

export async function getFAQById(id: string): Promise<FAQItem | null> {
  const faq = faqs.find((f) => f.id === id);
  return faq || null;
}
