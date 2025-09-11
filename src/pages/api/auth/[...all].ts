import type { APIRoute } from "astro";
import { auth } from "../../../lib/auth";

// Catch-all handler to mount Better Auth at /api/auth/*
export const ALL: APIRoute = async ({ request }) => {
  const res = await auth.handler(request);
  return res as Response;
};
