// @ts-check
import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'url';
import path from 'path';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  // TODO: substituir pelo domínio real quando registrado
  site: 'https://scaleco.com.br',

  trailingSlash: 'never',

  build: {
    format: 'file',
  },

  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
  ],

  vite: {
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, 'src/components'),
        '@layouts': path.resolve(__dirname, 'src/layouts'),
        '@styles': path.resolve(__dirname, 'src/styles'),
        '@data': path.resolve(__dirname, 'src/data'),
        '@/lib': path.resolve(__dirname, 'src/lib'),
        '@/components': path.resolve(__dirname, 'src/components'),
      },
    },
  },
});
