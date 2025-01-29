import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.js', // Path to your setup file
    css: true,
    threads: false, // Disable worker threads to prevent conflicts
    isolate: false, // Run tests in the same context
    minThreads: 1,  // Explicitly set minimum threads
    maxThreads: 1,  // Explicitly set maximum threads
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'lcov'],
    },
  },
});
