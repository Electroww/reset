import { relations } from 'drizzle-orm';
import { pgTable, serial, text } from 'drizzle-orm/pg-core';
import { teams } from './teams';
import { companies } from './companies';

export const clients = pgTable('clients', {
  client_id: serial('client_id').primaryKey(),
  job: text('job').notNull(),
});

export const clientsRelations = relations(clients, ({ many, one }) => ({
  teams: many(teams),
  company: one(companies),
}));
