import { pgEnum, pgTable, text, uuid } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom().notNull(),
  username: text('username').notNull().unique(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
})

export type User = typeof users.$inferSelect
export const userForInsertSchema = createInsertSchema(users)
export const userSchema = createSelectSchema(users)

export const posts = pgTable('posts', {
  id: uuid('id').primaryKey().defaultRandom().notNull(),
  content: text('content').notNull(),
  userId: uuid('user_id')
    .references(() => users.id)
    .notNull(),
})

export type Post = typeof posts.$inferSelect
export const postForInsertSchema = createInsertSchema(posts)
export const postSchema = createSelectSchema(posts)

export const emoji = pgEnum('emojis', ['like', 'love', 'smile', 'angry', 'sad'])
export const reactions = pgTable('reactions', {
  id: uuid('id').primaryKey().defaultRandom().notNull(),
  emoji: emoji('emoji').notNull(),
  userId: uuid('user_id')
    .references(() => users.id)
    .notNull(),
  postId: uuid('post_id')
    .references(() => posts.id)
    .notNull(),
})

export type Reaction = typeof reactions.$inferSelect
export const reactionForInsertSchema = createInsertSchema(reactions)
export const reactionSchema = createSelectSchema(reactions)
