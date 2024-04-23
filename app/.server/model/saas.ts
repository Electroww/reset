import { relations, sql } from 'drizzle-orm';
import { timestamp, pgTable, serial, text } from 'drizzle-orm/pg-core';
import { teams } from './teams';

export const saas = pgTable('saas', {
  id: serial('id').primaryKey(),
  url: text('url').notNull(),
  name: text('name').notNull(),
  logo: text('logo'),
  createdAt: timestamp('created_at').default(sql`now()`),
});

export const saasRelations = relations(saas, ({ many }) => ({
  teams: many(teams),
}));
