import { sql } from 'drizzle-orm';
import { timestamp, pgTable, serial, text, bigint } from 'drizzle-orm/pg-core';
import { group } from './group';

export const saas = pgTable('saas', {
  id: serial('id').primaryKey(),
  url: text('url').notNull(),
  name: text('name').notNull(),
  logo: text('logo'),
  createdAt: timestamp('created_at').default(sql`now()`),
});

export const groupeSaas = pgTable('groupe_saas', {
  id: serial('id').primaryKey(),
  groupId: bigint('group_id', { mode: 'number' }).references(() => group.id),
  saasId: bigint('saas_id', { mode: 'number' }).references(() => saas.id),
  createdAt: timestamp('created_at').default(sql`now()`),
});
