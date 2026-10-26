import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // Reuse source-keyed TypeScript transforms; tests still execute on every run.
    fsModuleCache: true,
  },
})
