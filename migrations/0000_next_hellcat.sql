CREATE TYPE "public"."link_precedence" AS ENUM('primary', 'secondary');--> statement-breakpoint
CREATE TABLE "contacts_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"phone_number" text,
	"email" text,
	"linked_id" integer,
	"link_precedence" "link_precedence" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
