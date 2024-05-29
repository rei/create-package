import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    testTimeout: 100000,
    globals: true,
    include: ['src/test/e2e/*.{spec,test}.{mjs,mts}', 'test'],
    environment: 'node',
  },
});
