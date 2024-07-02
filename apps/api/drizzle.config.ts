import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: 'src/plugins/drizzle.schema.ts',
  out: 'src/migrations/',
  dialect: 'postgresql',
  dbCredentials: {
    host: 'localhost',
    port: 5432,
    user: 'user',
    password: 'password',
    database: 'postgres',
    ssl: false,
  },
})
