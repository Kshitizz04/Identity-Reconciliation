import { pgTable, integer, text, timestamp, pgEnum, serial } from "drizzle-orm/pg-core";

export const linkPrecedenceEnum = pgEnum("link_precedence", ["primary", "secondary"]);

export const contactsTable = pgTable("contacts_table", {
  id: serial("id").primaryKey().notNull(),
  phoneNumber: text("phone_number"),
  email: text("email"),
  linkedId: integer("linked_id"),
  linkPrecedence: linkPrecedenceEnum("link_precedence").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});

export type InsertUser = typeof contactsTable.$inferInsert;
export type SelectUser = typeof contactsTable.$inferSelect;




