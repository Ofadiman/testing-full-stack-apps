import Fastify from 'fastify'
import {
  fastifyTRPCPlugin,
  CreateFastifyContextOptions,
  FastifyTRPCPluginOptions,
} from '@trpc/server/adapters/fastify'
import { publicProcedure, router } from './trpc'
import cors from '@fastify/cors'

const trpcRouter = router({
  getUser: publicProcedure.query(async () => {
    return { id: '9d0dc229-9b46-4bae-8ea7-29e69586f53b', name: 'ofadiman' }
  }),
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
