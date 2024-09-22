import type { MiddlewareHandler } from "hono";
import { createMiddleware } from "hono/factory";
import { staticAssets } from "remix-hono/cloudflare";

import type { ServerEnv } from "@/server/serverUtil";

export function staticAssetsMiddleware(): MiddlewareHandler {
  return createMiddleware<ServerEnv>(async (c, next) => {
    if (process.env.NODE_ENV !== "development" || import.meta.env.PROD) {
      return staticAssets()(c as any, next);
    }
    await next();
  });
}
