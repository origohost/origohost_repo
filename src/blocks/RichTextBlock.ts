import type { Block } from 'payload';

export const RichTextBlock: Block = {
  slug: 'richText',
  labels: {
    singular: 'Rich Text Block',
    plural: 'Rich Text Blocks',
  },
  fields: [
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
  ],
};
