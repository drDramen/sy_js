import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
      { find: '@lib', replacement: fileURLToPath(new URL('./src/lib', import.meta.url)) },
      {
        find: '@helpers',
        replacement: fileURLToPath(new URL('./src/lib/helpers', import.meta.url)),
      },
      {
        find: '@components',
        replacement: fileURLToPath(new URL('./src/components', import.meta.url)),
      },
    ],
  },
});
