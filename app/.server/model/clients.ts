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

export const clientsToTeams = pgTable('clients_to_teams', {
  clientId: serial('client_id')
    .notNull()
    .references(() => clients.id),
  teamId: serial('team_id')
    .notNull()
    .references(() => teams.id),
});

export const clientsToTeamsRelations = relations(clientsToTeams, ({ one }) => ({
  client: one(clients, {
    fields: [clientsToTeams.clientId],
    references: [clients.id],
  }),
  team: one(teams, {
    fields: [clientsToTeams.teamId],
    references: [teams.id],
  }),
}));
