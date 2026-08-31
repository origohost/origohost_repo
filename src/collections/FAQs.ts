import type { CollectionConfig } from 'payload';
import { anyoneCanRead, authenticatedOnly } from '../access';

export const FAQs: CollectionConfig = {
  slug: 'faqs',
  admin: {
    useAsTitle: 'question',
    defaultColumns: ['question', 'category', 'order'],
  },
  access: {
    read: anyoneCanRead,
    create: authenticatedOnly,
    update: authenticatedOnly,
    delete: authenticatedOnly,
  },
  fields: [
    {
      name: 'question',
      type: 'text',
      required: true,
    },
    {
      name: 'answer',
      type: 'textarea',
      required: true,
    },
    {
      name: 'category',
      type: 'text',
      defaultValue: 'General',
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
    },
  ],
};
