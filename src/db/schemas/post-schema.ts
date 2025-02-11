import { users } from "@/db/schemas/auth-schema";
import { relations, sql } from "drizzle-orm";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const posts = pgTable("posts", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  title: text("title").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// relations
export const userRelations = relations(users, ({ many }) => ({
  posts: many(posts),
}));
export const postRelations = relations(posts, ({ one }) => ({
  user: one(users, { fields: [posts.userId], references: [users.id] }),
}));

// zod schemas for form validation
export const PostSchema = createSelectSchema(posts);
export const InsertPostSchema = createInsertSchema(posts, {
  title: (schema) => schema.min(5).max(20),
  content: (schema) => schema.min(10).max(1000),
});
export const UpdatePostSchema = createInsertSchema(posts, {
  title: (schema) => schema.min(5).max(20),
  content: (schema) => schema.min(10).max(1000),
});

// type definitions
export type TPost = typeof posts.$inferSelect;
export type TInsertPost = typeof posts.$inferInsert;
export type TUpdatePost = z.infer<typeof UpdatePostSchema>;
