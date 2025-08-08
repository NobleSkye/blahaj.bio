import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import clerk from '@clerk/astro';
import node from '@astrojs/node';

export default defineConfig({
  integrations: [
    tailwind(),
    clerk({
      appearance: {
        variables: {
          colorPrimary: '#2563eb'
        }
      }
    })
  ],
  adapter: node({
    mode: 'standalone'
  }),
  site: 'https://blahaj.bio',
  base: '/',
  output: 'server',
  build: {
    format: 'file'
  }
});



