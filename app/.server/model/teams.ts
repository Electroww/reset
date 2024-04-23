import { relations, sql } from 'drizzle-orm';
import { timestamp, pgTable, serial, text } from 'drizzle-orm/pg-core';
import { companies } from './companies';
import { clients } from './clients';
import { saas } from './saas';

export const teams = pgTable('teams', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at').default(sql`now()`),
});

export const teamsRelations = relations(teams, ({ many, one }) => ({
  company: one(companies),
  clients: many(clients),
  saas: many(saas),
}));
