import { clerkMiddleware } from "@clerk/astro/server";

export const onRequest = clerkMiddleware({
  authorizedParties: ['https://blahaj.bio', 'https://www.blahaj.bio', 'http://localhost:4321'],
});

