import { clerkMiddleware } from "@clerk/astro/server";

export const onRequest = clerkMiddleware();

clerkMiddleware({
  authorizedParties: ['https://blahaj.bio', 'https://www.blahaj.bio', 'localhost:4321'],
})

