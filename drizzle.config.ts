import type { Config } from 'drizzle-kit';
export default {
  schema: './app/.server/model/*.ts',
  driver: 'pg',
  verbose: true,
  strict: true,
  out: './drizzle',
} satisfies Config;
