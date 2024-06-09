import Fastify from 'fastify'
import {
  fastifyTRPCPlugin,
  CreateFastifyContextOptions,
  FastifyTRPCPluginOptions,
} from '@trpc/server/adapters/fastify'
import { publicProcedure, router } from './trpc'
import cors from '@fastify/cors'
import { z } from 'zod'

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

function createContext({ req, res }: CreateFastifyContextOptions) {
  const user = { name: 'anonymous' }

  return { req, res, user }
}

export type Context = Awaited<ReturnType<typeof createContext>>

const fastify = Fastify({
  logger: true,
})

fastify.register(cors, {})

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

fastify.get('/health', function (_request, reply) {
  reply.send({ status: 'ok' })
})

fastify.listen({ host: '0.0.0.0', port: 3000 })
