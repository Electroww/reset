import { sql } from 'drizzle-orm';
import { timestamp, pgTable, serial, text, bigint } from 'drizzle-orm/pg-core';



export const Users = pgTable('Users', {
  user_id: serial('id').primaryKey(),
  Email: text('full_name').notNull(),
  password: timestamp('created_at').default(sql`now()`),
});

