import { clerkMiddleware } from "@hono/clerk-auth";

export function authMiddleware() {
  return clerkMiddleware();
}
