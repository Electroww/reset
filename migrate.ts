import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import dotenv from 'dotenv';

const connectionString = dotenv.config().parsed?.DATABASE_URL || '';
const sql = postgres(connectionString, { max: 1 });
const db = drizzle(sql);
console.log(db);
await migrate(db, { migrationsFolder: 'drizzle' });
await sql.end();
