CREATE TABLE IF NOT EXISTS "clients" (
	"id" text PRIMARY KEY NOT NULL,
	"job" text,
	"company_id" serial NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "clients_to_teams" (
	"client_id" text NOT NULL,
	"team_id" serial NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "companies" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "saas" (
	"id" serial PRIMARY KEY NOT NULL,
	"url" text NOT NULL,
	"name" text NOT NULL,
	"logo" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "saas_to_teams" (
	"saas_id" serial NOT NULL,
	"team_id" serial NOT NULL,
	CONSTRAINT "saas_to_teams_saas_id_team_id_pk" PRIMARY KEY("saas_id","team_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "teams" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"company_id" serial NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "clients_to_teams" ADD CONSTRAINT "clients_to_teams_client_id_clients_id_fk" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "clients_to_teams" ADD CONSTRAINT "clients_to_teams_team_id_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "saas_to_teams" ADD CONSTRAINT "saas_to_teams_saas_id_saas_id_fk" FOREIGN KEY ("saas_id") REFERENCES "saas"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "saas_to_teams" ADD CONSTRAINT "saas_to_teams_team_id_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
