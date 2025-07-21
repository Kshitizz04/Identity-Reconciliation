CREATE TABLE "contacts_table" (
	"id" integer PRIMARY KEY NOT NULL,
	"phone_number" text,
	"email" text,
	"linked_id" integer,
	"link_precedence" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"deleted_at" timestamp
);
