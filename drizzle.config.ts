import type { Config } from 'drizzle-kit';
export default {
  schema: './app/.server/model/*.ts',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL || '',
  },
  verbose: true,
  strict: true,
  out: './drizzle',
} satisfies Config;
