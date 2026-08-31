import type { CollectionConfig } from 'payload';
import { anyoneCanRead, authenticatedOnly } from '../access';

export const TeamMembers: CollectionConfig = {
  slug: 'team-members',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'department', 'order'],
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
      name: 'role',
      type: 'text',
      required: true,
    },
    {
      name: 'bio',
      type: 'textarea',
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'department',
      type: 'text',
      defaultValue: 'Leadership',
    },
    {
      name: 'githubUrl',
      type: 'text',
    },
    {
      name: 'linkedinUrl',
      type: 'text',
    },
    {
      name: 'twitterUrl',
      type: 'text',
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
    },
  ],
};
