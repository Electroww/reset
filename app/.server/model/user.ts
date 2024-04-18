import { sql } from 'drizzle-orm';
import { timestamp, pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
  id: serial('id').primaryKey(),
  fullName: text('full_name').notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: text('password').notNull(),
  createdAt: timestamp('created_at').default(sql`now()`),
});
