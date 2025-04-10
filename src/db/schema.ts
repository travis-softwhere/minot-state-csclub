import { pgTable, serial, text, varchar, timestamp } from 'drizzle-orm/pg-core';

// Members table
export const members = pgTable('members', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  role: varchar('role', { length: 50 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Opportunity sections table
export const opportunitySections = pgTable('opportunity_sections', {
  id: serial('id').primaryKey(),
  sectionId: varchar('section_id', { length: 50 }).notNull().unique(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Opportunities table
export const opportunities = pgTable('opportunities', {
  id: serial('id').primaryKey(),
  opportunityId: varchar('opportunity_id', { length: 50 }).notNull().unique(),
  sectionId: varchar('section_id', { length: 50 })
    .notNull()
    .references(() => opportunitySections.sectionId),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  path: varchar('path', { length: 255 }).notNull(),
  date: varchar('date', { length: 50 }),
  deadline: varchar('deadline', { length: 50 }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Election candidates table
export const electionCandidates = pgTable('election_candidates', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  positions: text('positions').notNull(),
  statement: text('statement').notNull(),
  image_data: text('image_data').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
}); 