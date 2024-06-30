import { userForInsertSchema } from '../plugins/drizzle.schema'
import { publicProcedure, router } from '../trpc'

export const authRouter = router({
  register: publicProcedure.input(userForInsertSchema).mutation(async (opts) => {
    console.log(opts.ctx.user)
  }),
})
