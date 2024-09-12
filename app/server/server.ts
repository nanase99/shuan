import { Hono } from "hono";
import { poweredBy } from "hono/powered-by";

import { setRoutes } from "@/api/routes";
import type { ServerEnv } from "@/types/common";
import { remixMiddleware, staticAssetsMiddleware } from "./middlewares";

// TODO: assetsのパスを変換する

const server = new Hono<ServerEnv>();

server.use(poweredBy());

server.use(staticAssetsMiddleware());

const routes = setRoutes(server);

server.use(remixMiddleware());

export default server;

export type AppType = typeof routes;
