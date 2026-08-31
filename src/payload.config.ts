import { buildConfig } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

import { Categories } from './collections/Categories';
import { Pages } from './collections/Pages';
import { BlogPosts } from './collections/BlogPosts';
import { Events } from './collections/Events';
import { Programs } from './collections/Programs';
import { Resources } from './collections/Resources';
import { FAQs } from './collections/FAQs';
import { Partners } from './collections/Partners';
import { Sponsors } from './collections/Sponsors';
import { TeamMembers } from './collections/TeamMembers';
import { SiteSettings } from './globals/SiteSettings';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: 'users',
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    {
      slug: 'users',
      auth: true,
      fields: [
        {
          name: 'name',
          type: 'text',
        },
      ],
    },
    {
      slug: 'media',
      upload: true,
      fields: [
        {
          name: 'alt',
          type: 'text',
        },
        {
          name: 'caption',
          type: 'text',
        },
      ],
    },
    Categories,
    Pages,
    BlogPosts,
    Events,
    Programs,
    Resources,
    FAQs,
    Partners,
    Sponsors,
    TeamMembers,
  ],
  globals: [SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'origohost-payload-secret-key-3.x',
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || 'postgres://postgres:postgres@127.0.0.1:5432/origohost',
    },
  }),
});
