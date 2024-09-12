import type { MiddlewareHandler } from "hono";
import { env } from "hono/adapter";
import { createMiddleware } from "hono/factory";

type ArgEnv = {
  NODE_ENV: string;
};

export function envMiddleware(): MiddlewareHandler {
  return createMiddleware(async (c, next) => {
    const envParams = env<ArgEnv>(c);

    c.set(
      "isProduction",
      envParams.NODE_ENV === "production" || import.meta.env.PROD,
    );

    await next();
  });
}
