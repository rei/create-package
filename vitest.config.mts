import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    testTimeout: 20000,
    globals: true,
    include: ['src/*.{spec,test}.{mjs,mts}'],
    environment: 'node',
    coverage: {
      reporter: ['text', 'json-summary', 'html'],
      all: true,
      exclude: [
        'test',
        'dist',
        '**/*.d.mts',
        'src/types.mts',
      ],
      include: ['src', 'test'],
      clean: true,
      branches: 80,
      lines: 80,
      functions: 80,
      statements: 80,
    },
  },
});
