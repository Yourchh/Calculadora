import { defineConfig } from 'vitest/config';
// Usamos require para evitar el error de "Unable to resolve path" en el editor
const react = require('@vitejs/plugin-react');

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTests.js',
    // Patrón para encontrar tu carpeta __tests__
    include: ['**/__tests__/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'junit'],
    },
  },
});