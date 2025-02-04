import { globSync } from 'node:fs';

import { defineConfig } from 'vite';
import devServer from '@hono/vite-dev-server';
import bunAdapter from '@hono/vite-dev-server/bun';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  if (mode === 'client') {
    return {
      build: {
        rollupOptions: {
          input: globSync('./client/**/*.{ts,tsx,css}'),
          output: {
            dir: 'static',
            entryFileNames: '[name].js',
            chunkFileNames: 'assets/[name]-[hash].js',
            assetFileNames: 'assets/[name].[ext]'
          },
        },
        emptyOutDir: false,
        copyPublicDir: false,
      },
    };
  }

  return {
    server: {
      port: 3000,
    },
    plugins: [
      devServer({
        adapter: bunAdapter,
        entry: 'app.tsx',
      }),
      tailwindcss()
    ],
  };
});
