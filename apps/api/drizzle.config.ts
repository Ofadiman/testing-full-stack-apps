import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: 'src/plugins/drizzle.schema.ts',
  out: 'src/migrations/',
  dialect: 'postgresql',
  dbCredentials: {
    host: 'postgres',
    user: 'user',
    password: 'password',
    database: 'postgres',
    ssl: false,
  },
})
