import type { CollectionConfig } from 'payload';
import { anyoneCanRead, authenticatedOnly } from '../access';
import { seoFields } from '../fields/seoFields';
import { HeroBlock } from '../blocks/HeroBlock';
import { RichTextBlock } from '../blocks/RichTextBlock';
import { CallToActionBlock } from '../blocks/CallToActionBlock';
import { FeatureGridBlock } from '../blocks/FeatureGridBlock';
import { FaqGridBlock } from '../blocks/FaqGridBlock';
import { QuoteBlock } from '../blocks/QuoteBlock';

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'status', 'updatedAt'],
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
      name: 'layout',
      type: 'blocks',
      blocks: [
        HeroBlock,
        RichTextBlock,
        CallToActionBlock,
        FeatureGridBlock,
        FaqGridBlock,
        QuoteBlock,
      ],
    },
    seoFields,
  ],
};
