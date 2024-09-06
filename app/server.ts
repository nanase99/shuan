import type { AppLoadContext, RequestHandler } from "@remix-run/cloudflare";
import { Hono } from "hono";
import { poweredBy } from "hono/powered-by";
import { staticAssets } from "remix-hono/cloudflare";
import { remix } from "remix-hono/handler";

import { setMockRoutes, setRoutes } from "@/api/routes";

// TODO: assetsのパスを変換する

const isProduction =
  process.env.NODE_ENV !== "development" || import.meta.env.PROD;
const disableMock = isProduction || process.env.API_ENV === "staging";

const app = new Hono();

let handler: RequestHandler | undefined;

app.use(poweredBy());

const routes = disableMock ? setRoutes(app) : setMockRoutes(app);

app.use(
  async (c, next) => {
    if (isProduction) {
      return staticAssets()(c, next);
    }
    await next();
  },
  async (c, next) => {
    if (isProduction) {
      const serverBuild = await import("../build/server");
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
      })(c, next);
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
  },
);

export default app;

export type AppType = typeof routes;
