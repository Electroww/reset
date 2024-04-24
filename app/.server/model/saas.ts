import { relations, sql } from 'drizzle-orm';
import {
  timestamp,
  pgTable,
  serial,
  text,
  primaryKey,
} from 'drizzle-orm/pg-core';
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

export const saasToTeams = pgTable(
  'saas_to_teams',
  {
    saasId: serial('saas_id')
      .notNull()
      .references(() => saas.id),
    teamId: serial('team_id')
      .notNull()
      .references(() => teams.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.saasId, t.teamId] }),
  })
);

export const saasToTeamsRelations = relations(saasToTeams, ({ one }) => ({
  saas: one(saas, {
    fields: [saasToTeams.saasId],
    references: [saas.id],
  }),
  team: one(teams, {
    fields: [saasToTeams.teamId],
    references: [teams.id],
  }),
}));
