import { z } from 'zod';

const serverEnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  DATABASE_URI: z.string().default('postgres://postgres:postgres@127.0.0.1:5432/origohost'),
  PAYLOAD_SECRET: z.string().default('origohost-payload-secret-key-3.x'),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),
});

const publicEnvSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.string().default('http://localhost:3000'),
  NEXT_PUBLIC_SUPABASE_URL: z.string().optional(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().optional(),
});

function parseEnv() {
  const isServer = typeof window === 'undefined';

  const publicEnv = publicEnvSchema.parse({
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  });

  if (!isServer) {
    return {
      publicEnv,
      serverEnv: {} as z.infer<typeof serverEnvSchema>,
    };
  }

  const serverEnv = serverEnvSchema.parse({
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URI: process.env.DATABASE_URI,
    PAYLOAD_SECRET: process.env.PAYLOAD_SECRET,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  });

  return { publicEnv, serverEnv };
}

export const env = parseEnv();
