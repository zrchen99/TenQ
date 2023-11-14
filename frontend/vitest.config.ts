// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Put your Vitest configurations here
    globals: true,
    environment: 'jsdom',
  },
});