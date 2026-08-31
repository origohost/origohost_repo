import type { Field } from 'payload';

export const seoFields: Field = {
  name: 'seo',
  type: 'group',
  label: 'SEO Metadata',
  fields: [
    {
      name: 'metaTitle',
      type: 'text',
      label: 'Meta Title',
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      label: 'Meta Description',
    },
    {
      name: 'canonicalUrl',
      type: 'text',
      label: 'Canonical URL',
    },
    {
      name: 'ogImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Open Graph Image',
    },
  ],
};
