import type { CollectionConfig } from 'payload';
import { anyoneCanRead, authenticatedOnly } from '../access';
import { seoFields } from '../fields/seoFields';

export const Events: CollectionConfig = {
  slug: 'events',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'date', 'location', 'eventType'],
  },
  versions: {
    drafts: true,
    maxPerDoc: 20,
  },
  access: {
    read: anyoneCanRead,
    create: authenticatedOnly,
    update: authenticatedOnly,
    delete: authenticatedOnly,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'date',
      type: 'date',
      required: true,
    },
    {
      name: 'startTime',
      type: 'text',
    },
    {
      name: 'endTime',
      type: 'text',
    },
    {
      name: 'location',
      type: 'text',
    },
    {
      name: 'eventType',
      type: 'select',
      options: [
        { label: 'Online', value: 'ONLINE' },
        { label: 'In-Person', value: 'IN_PERSON' },
        { label: 'Hybrid', value: 'HYBRID' },
      ],
      defaultValue: 'ONLINE',
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
    },
    seoFields,
  ],
};
