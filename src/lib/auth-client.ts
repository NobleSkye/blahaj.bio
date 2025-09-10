import { createAuthClient } from "better-auth/client";

export const authClient = createAuthClient({
  // baseURL optional when same origin
});

export const { signIn, signOut, getSession, useSession } = authClient;
