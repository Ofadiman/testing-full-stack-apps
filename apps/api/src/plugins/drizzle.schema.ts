import { pgEnum, pgTable, text, uuid } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom().notNull(),
  username: text('username').notNull().unique(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
})

export const posts = pgTable('posts', {
  id: uuid('id').primaryKey().defaultRandom().notNull(),
  content: text('content').notNull(),
  userId: uuid('user_id')
    .references(() => users.id)
    .notNull(),
})

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
