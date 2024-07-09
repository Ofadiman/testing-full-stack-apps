import { TRPCError } from '@trpc/server'
import { userForInsertSchema, users } from '../plugins/drizzle.schema'
import { publicProcedure, router } from '../trpc'
import { hash, genSalt, compare } from 'bcryptjs'
import { eq } from 'drizzle-orm'
import { loginSchema } from './auth.schema'

export const authRouter = router({
  register: publicProcedure.input(userForInsertSchema).mutation(async (opts) => {
    const [userByUsername] = await opts.ctx.drizzle
      .select()
      .from(users)
      .where(eq(users.username, opts.input.username))
    if (userByUsername) {
      throw new TRPCError({ code: 'CONFLICT', message: 'user with that username already exists' })
    }

    const [userByEmail] = await opts.ctx.drizzle
      .select()
      .from(users)
      .where(eq(users.email, opts.input.email))
    if (userByEmail) {
      throw new TRPCError({ code: 'CONFLICT', message: 'user with that email already exists' })
    }

    const salt = await genSalt(10)
    const passwordHash = await hash(opts.input.password, salt)

    const [user] = await opts.ctx.drizzle
      .insert(users)
      .values({
        email: opts.input.email,
        password: passwordHash,
        username: opts.input.username,
      })
      .returning()

    if (!user) {
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' })
    }

    const { password, ...rest } = user

    return rest
  }),
  login: publicProcedure.input(loginSchema).mutation(async (opts) => {
    const [userByUsername] = await opts.ctx.drizzle
      .select()
      .from(users)
      .where(eq(users.username, opts.input.username))
    if (!userByUsername) {
      throw new TRPCError({ code: 'UNAUTHORIZED', message: 'invalid username or password' })
    }

    const isPasswordCorrect = await compare(opts.input.password, userByUsername.password)
    if (!isPasswordCorrect) {
      throw new TRPCError({ code: 'UNAUTHORIZED', message: 'invalid username or password' })
    }

    const token = opts.ctx.jwt.sign({ id: userByUsername.id })
    opts.ctx.res.setCookie('auth_token', token, { maxAge: 3_600 })
  }),
})
