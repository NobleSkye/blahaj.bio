import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

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



