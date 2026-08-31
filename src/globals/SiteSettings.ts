import type { GlobalConfig } from 'payload';
import { anyoneCanRead, authenticatedOnly } from '../access';
import { seoFields } from '../fields/seoFields';

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  admin: {
    group: 'Settings',
  },
  access: {
    read: anyoneCanRead,
    update: authenticatedOnly,
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      required: true,
      defaultValue: 'OrigoHOST',
    },
    {
      name: 'tagline',
      type: 'text',
      defaultValue: 'Empowering Communities & Developers',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'contactEmail',
      type: 'text',
      defaultValue: 'contact@origohost.com',
    },
    {
      name: 'contactPhone',
      type: 'text',
    },
    {
      name: 'socialLinks',
      type: 'group',
      fields: [
        { name: 'github', type: 'text' },
        { name: 'twitter', type: 'text' },
        { name: 'linkedin', type: 'text' },
        { name: 'discord', type: 'text' },
      ],
    },
    seoFields,
  ],
};
