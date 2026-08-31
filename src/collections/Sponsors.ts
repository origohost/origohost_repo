import type { CollectionConfig } from 'payload';
import { anyoneCanRead, authenticatedOnly } from '../access';

export const Sponsors: CollectionConfig = {
  slug: 'sponsors',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'tier', 'featured', 'order'],
  },
  access: {
    read: anyoneCanRead,
    create: authenticatedOnly,
    update: authenticatedOnly,
    delete: authenticatedOnly,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'website',
      type: 'text',
    },
    {
      name: 'tier',
      type: 'select',
      options: [
        { label: 'Platinum', value: 'PLATINUM' },
        { label: 'Gold', value: 'GOLD' },
        { label: 'Silver', value: 'SILVER' },
        { label: 'Bronze', value: 'BRONZE' },
        { label: 'Community', value: 'COMMUNITY' },
      ],
      defaultValue: 'GOLD',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
};
