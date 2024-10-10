DO $$ BEGIN
 CREATE TYPE "public"."form_type" AS ENUM('company_customer_register', 'company_info');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "forms" (
	"id" char(16) PRIMARY KEY NOT NULL,
	"type" "form_type" NOT NULL,
	"sended" boolean DEFAULT false
);
