import type { APIRoute } from 'astro';
import { auth } from '@/lib/auth';

export const all: APIRoute = async (ctx) => {
  return auth.handler(ctx.request);
};
