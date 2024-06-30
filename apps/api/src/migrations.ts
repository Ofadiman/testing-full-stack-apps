import { Client } from 'pg'
import * as schema from './plugins/drizzle.schema'
import { drizzle } from 'drizzle-orm/node-postgres'
import { migrate } from 'drizzle-orm/node-postgres/migrator'

void (async () => {
  const client = new Client({
    host: 'postgres',
    port: 5432,
    user: 'user',
    password: 'password',
    database: 'postgres',
  })

  await client.connect()

  await migrate(
    drizzle(client, {
      schema,
    }),
    { migrationsFolder: 'src/migrations' },
  )

  await client.end()
})()
