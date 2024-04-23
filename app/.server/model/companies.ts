import { pgTable, serial, text } from 'drizzle-orm/pg-core';
import { teams } from './teams';
import { relations } from 'drizzle-orm';
import { clients } from './clients';

export const companies = pgTable('companies', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
});

export const companiesRelations = relations(companies, ({ many }) => ({
  teams: many(teams),
  clients: many(clients),
}));
