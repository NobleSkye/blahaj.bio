import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import clerk from '@clerk/astro';
import node from '@astrojs/node';

export default defineConfig({
  integrations: [
    tailwind(),
    clerk({
      afterSignInUrl: '/dashboard',
      afterSignUpUrl: '/dashboard',
      signInUrl: '/login',
      signUpUrl: '/signup'
    })
  ],
  site: 'https://blahaj.bio',
  base: '/',
  output: 'server',
  adapter: node({
    mode: 'standalone'
  }),
  build: {
    format: 'file'
  }
});



