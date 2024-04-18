CREATE TABLE IF NOT EXISTS "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"full_name" text NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
