import type { AppLoadContext, RequestHandler } from "@remix-run/node";
import { Hono } from "hono";
import { poweredBy } from "hono/powered-by";
import { remix } from "remix-hono/handler";

// TODO: assetsのパスを変換する

const app = new Hono<{
  Bindings: {
    MY_VAR: string;
  };
}>();

let handler: RequestHandler | undefined;

app.use(poweredBy());
app.get("/hono", (c) => {
  return c.json([{ text: `Hono, ${c.env.MY_VAR}` }]);
});

app.use(async (c, next) => {
  if (process.env.NODE_ENV !== "development" || import.meta.env.PROD) {
    const serverBuild = await import("./build/server");
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
});

export default app;
