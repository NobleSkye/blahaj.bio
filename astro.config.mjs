import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import node from '@astrojs/node';

export default defineConfig({
  integrations: [tailwind()],
  site: 'https://blahaj.bio',
  base: '/',
  output: 'server',
  adapter: node({ mode: 'standalone' }),
});