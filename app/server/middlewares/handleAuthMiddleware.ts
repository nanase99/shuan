import { getAuth } from "@hono/clerk-auth";
import { createMiddleware } from "hono/factory";

export function handleAuthMiddleware() {
  return createMiddleware(async (c, next) => {
    const auth = getAuth(c);

    if (!auth?.userId) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    await next();
  });
}
