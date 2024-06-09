import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['src/**/*.unit.ts'], // Run only files that use vitest because otherwise there is an error that globals like `it` or `describe` are undefiend: "ReferenceError: it is not defined".
    coverage: {
      enabled: true,
      provider: 'istanbul',
      reporter: ['json'],
      reportsDirectory: 'coverage/vitest',
      all: true,
      include: ['src/**/*.ts', 'src/**/*.tsx'],
      exclude: ['src/**/*.unit.ts', 'src/**/*.unit.tsx'],
    },
  },
})
