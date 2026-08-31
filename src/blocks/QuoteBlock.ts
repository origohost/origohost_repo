import type { Block } from 'payload';

export const QuoteBlock: Block = {
  slug: 'quote',
  labels: {
    singular: 'Quote Section',
    plural: 'Quote Sections',
  },
  fields: [
    {
      name: 'quote',
      type: 'textarea',
      required: true,
    },
    {
      name: 'author',
      type: 'text',
      required: true,
    },
    {
      name: 'authorTitle',
      type: 'text',
    },
  ],
};
