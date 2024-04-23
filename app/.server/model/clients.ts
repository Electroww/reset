import { relations } from 'drizzle-orm';
import { pgTable, serial, text } from 'drizzle-orm/pg-core';
import { teams } from './teams';
import { companies } from './companies';

export const clients = pgTable('clients', {
  id: serial('id').primaryKey(),
  job: text('job').notNull(),
  companyId: serial('company_id'),
});

export const clientsRelations = relations(clients, ({ many, one }) => ({
  teams: many(teams),
  company: one(companies, {
    fields: [clients.companyId],
    references: [companies.id],
  }),
}));
