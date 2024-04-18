import type { Config } from 'drizzle-kit';
export default {
  schema: './app/.server/model/*.ts',
  out: './drizzle',
} satisfies Config;
