import type { Block } from 'payload';

export const FaqGridBlock: Block = {
  slug: 'faqGrid',
  labels: {
    singular: 'FAQ Grid Section',
    plural: 'FAQ Grid Sections',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Frequently Asked Questions',
    },
    {
      name: 'faqs',
      type: 'relationship',
      relationTo: 'faqs',
      hasMany: true,
    },
  ],
};
