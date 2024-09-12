import type { AppLoadContext, RequestHandler } from "@remix-run/cloudflare";
import type { MiddlewareHandler } from "hono";
import { createMiddleware } from "hono/factory";
import { remix } from "remix-hono/handler";

import type { ServerEnv } from "@/types/common";

let handler: RequestHandler | undefined;

export function remixMiddleware(): MiddlewareHandler {
  return createMiddleware<ServerEnv>(async (c, next) => {
    const isProduction = c.var.isProduction;
    if (isProduction) {
      const serverBuild = await import("@/../build/server");
      return remix({
        build: serverBuild,
        mode: "production",
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        getLoadContext(c) {
          return {
            cloudflare: {
              env: c.env,
            },
          };
        },
      })(c as any, next);
    } else {
      if (!handler) {
        // @ts-expect-error it's not typed
        const build = await import("virtual:remix/server-build");
        const { createRequestHandler } = await import("@remix-run/node");
        handler = createRequestHandler(build, "development");
      }
      const remixContext = {
        cloudflare: {
          env: c.env,
        },
      } as unknown as AppLoadContext;
      return handler(c.req.raw, remixContext);
    }
  });
}
