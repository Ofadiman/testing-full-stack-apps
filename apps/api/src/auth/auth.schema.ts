import { userSchema } from '../plugins/drizzle.schema'

export const loginSchema = userSchema.pick({ username: true, password: true })
