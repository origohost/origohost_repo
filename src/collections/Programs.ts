import type { CollectionConfig } from 'payload';
import { anyoneCanRead, authenticatedOnly } from '../access';
import { seoFields } from '../fields/seoFields';

export const Programs: CollectionConfig = {
  slug: 'programs',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'format', 'duration'],
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
      name: 'summary',
      type: 'textarea',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'format',
      type: 'text',
    },
    {
      name: 'duration',
      type: 'text',
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
    },
    seoFields,
  ],
};
