import { pgTable, integer, text, timestamp, serial } from 'drizzle-orm/pg-core';

export const contactsTable = pgTable('contacts_table', {
  id: serial('id').primaryKey().notNull(),
  phoneNumber: text('phone_number'),
  email: text('email'),
  linkedId: integer('linked_id'),
  linkPrecedence: text('link_precedence', { enum: ['primary', 'secondary'] }).notNull(),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
  deletedAt: timestamp('deleted_at'),
});

export type InsertUser = typeof contactsTable.$inferInsert;
export type SelectUser = typeof contactsTable.$inferSelect;




