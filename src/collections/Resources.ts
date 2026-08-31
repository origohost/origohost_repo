import type { CollectionConfig } from 'payload';
import { anyoneCanRead, authenticatedOnly } from '../access';
import { seoFields } from '../fields/seoFields';

export const Resources: CollectionConfig = {
  slug: 'resources',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'resourceType', 'category'],
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
      name: 'resourceType',
      type: 'select',
      options: [
        { label: 'Guide', value: 'GUIDE' },
        { label: 'Document', value: 'DOCUMENT' },
        { label: 'Tutorial', value: 'TUTORIAL' },
        { label: 'Toolkit', value: 'TOOLKIT' },
        { label: 'Report', value: 'REPORT' },
        { label: 'Link', value: 'LINK' },
      ],
      defaultValue: 'GUIDE',
    },
    {
      name: 'url',
      type: 'text',
    },
    {
      name: 'file',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
    },
    seoFields,
  ],
};
