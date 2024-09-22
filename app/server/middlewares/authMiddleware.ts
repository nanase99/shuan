import { clerkMiddleware } from "@hono/clerk-auth";
import type { MiddlewareHandler } from "hono";
import { createMiddleware } from "hono/factory";
import type { ServerEnv } from "../serverUtil";

export function authMiddleware(): MiddlewareHandler {
  return createMiddleware<ServerEnv>(async (c, next) => {
    return clerkMiddleware({
      publishableKey: c.env.CLERK_PUBLISHABLE_KEY,
      secretKey: c.env.CLERK_SECRET_KEY,
    })(c, next);
  });
}
