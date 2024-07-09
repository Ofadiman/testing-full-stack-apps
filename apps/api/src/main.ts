import type { FastifyCookieOptions } from '@fastify/cookie'
import cookie from '@fastify/cookie'
import Fastify from 'fastify'
import {
  fastifyTRPCPlugin,
  CreateFastifyContextOptions,
  FastifyTRPCPluginOptions,
} from '@trpc/server/adapters/fastify'
import { publicProcedure, router } from './trpc'
import cors from '@fastify/cors'
import { z } from 'zod'
import { drizzlePlugin } from './plugins/drizzle.plugin'
import { sql } from 'drizzle-orm'
import { authRouter } from './auth/auth.router'
import jwt, { FastifyJwtNamespace } from '@fastify/jwt'

declare module 'fastify' {
  interface FastifyInstance extends FastifyJwtNamespace<{ namespace: 'security' }> {}
}

export const userSchema = z.object({
  id: z.number().int(),
  username: z.string(),
  password: z.string(),
})
export type User = z.infer<typeof userSchema>

export const postSchema = z.object({
  id: z.number().int(),
  content: z.string(),
  userId: z.number().int(),
})
export type Post = z.infer<typeof postSchema>

export const reactionSchema = z.object({
  id: z.number().int(),
  type: z.enum(['like', 'love', 'haha', 'wow', 'angry']),
  postId: z.number().int(),
  userId: z.number().int(),
})
export type Reaction = z.infer<typeof reactionSchema>

export const homePagePostSchema = z
  .object({
    user: userSchema.omit({ password: true }),
    reactions: z.array(reactionSchema.omit({ postId: true })),
  })
  .merge(postSchema.omit({ userId: true }))
export type HomePagePost = z.infer<typeof homePagePostSchema>

const trpcRouter = router({
  auth: authRouter,
  posts: {
    getPosts: publicProcedure.query(async (): Promise<HomePagePost[]> => {
      return [
        {
          id: 1,
          content: 'first lorem ipsum',
          user: {
            id: 1,
            username: 'ofadiman',
          },
          reactions: [],
        },
        {
          id: 2,
          content: 'second lorem ipsum',
          user: {
            id: 1,
            username: 'ofadiman',
          },
          reactions: [
            {
              id: 1,
              userId: 2,
              type: 'wow',
            },
          ],
        },
        {
          id: 3,
          content: 'third lorem ipsum',
          user: {
            id: 2,
            username: 'szymon',
          },
          reactions: [
            {
              id: 2,
              userId: 1,
              type: 'like',
            },
          ],
        },
      ]
    }),
  },
})

export type TrpcRouter = typeof trpcRouter

export const createContext = ({ req, res }: CreateFastifyContextOptions) => {
  return { req, res, user: null, drizzle: fastify.drizzle, jwt: fastify.jwt }
}

const fastify = Fastify({
  logger: true,
})

fastify.register(drizzlePlugin)

fastify.register(cors)

fastify.register(cookie, { secret: 'cookie-secret' } satisfies FastifyCookieOptions)

fastify.register(jwt, { secret: 'jwt-secret' })

fastify.register(fastifyTRPCPlugin, {
  prefix: '/trpc',
  trpcOptions: {
    router: trpcRouter,
    createContext,
    onError({ path, error }) {
      console.error(`Error in tRPC handler on path '${path}':`, error)
    },
  } satisfies FastifyTRPCPluginOptions<TrpcRouter>['trpcOptions'],
})

fastify.get('/health', async function (_, reply) {
  await fastify.drizzle.execute(sql`select 1;`)
  reply.send({ server: 'ok', postgres: 'ok' })
})

fastify.listen({ host: '0.0.0.0', port: 3000 })
