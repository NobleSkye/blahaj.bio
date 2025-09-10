import { createClient } from 'better-auth/client';

export const authClient = createClient({
  baseURL: '/api/auth'
});
