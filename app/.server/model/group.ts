import { sql } from 'drizzle-orm';
import { timestamp, pgTable, serial, text, bigint } from 'drizzle-orm/pg-core';
import { Users } from '../database/native_model/users';

export const team = pgTable('team', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at').default(sql`now()`),
});

export const userTeam = pgTable('user_team', {
  id: serial('id').primaryKey(),
  userId: bigint('user_id', { mode: 'number' }).references(() => Users.user_id),
  teamId: bigint('team_id', { mode: 'number' }).references(() => team.id),
  createdAt: timestamp('created_at').default(sql`now()`),
});

