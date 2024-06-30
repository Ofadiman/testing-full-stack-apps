import fp from 'fastify-plugin'
import { drizzle } from 'drizzle-orm/node-postgres'
import { Client } from 'pg'
import * as schema from './drizzle.schema'

declare module 'fastify' {
  interface FastifyInstance {
    drizzle: ReturnType<typeof drizzle<typeof schema>>
  }
}

export const drizzlePlugin = fp(
  async function (fastify) {
    const client = new Client({
      host: 'postgres',
      port: 5432,
      user: 'user',
      password: 'password',
      database: 'postgres',
    })

    await client.connect()
    const db = drizzle(client, {
      schema,
    })

    fastify.decorate('drizzle', db)
  },
  { name: 'drizzle', fastify: '4.x' },
)
