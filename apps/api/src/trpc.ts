import { TRPCError, initTRPC } from '@trpc/server'
import { createContext } from './main'

const t = initTRPC.context<typeof createContext>().create()
export const router = t.router
export const publicProcedure = t.procedure
export const protectedProdecure = t.procedure.use(async (opts) => {
  if (opts.ctx.user === null) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }

  return opts.next()
})
