import { defineConfig } from 'vitest/config';
const react = require('@vitejs/plugin-react');

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    // Usamos './' para asegurar que busque en la raíz del espacio de trabajo
    setupFiles: ['./setupTests.js'], 
    include: ['__tests__/**/*.{test,spec}.{js,jsx,ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'junit'],
    },
  },
});