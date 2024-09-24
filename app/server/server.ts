import { Hono } from "hono";
import { poweredBy } from "hono/powered-by";

import { setRoutes } from "./apiRoutes";
import {
  authMiddleware,
  diMiddleware,
  staticAssetsMiddleware,
} from "./middlewares";
import type { ServerEnv } from "./serverUtil";

// TODO: assetsのパスを変換する

const server = new Hono<ServerEnv>();

server.use(poweredBy());

server.use(staticAssetsMiddleware());

server.use(authMiddleware());

server.use(...diMiddleware());

const routes = setRoutes(server);

export default server;

export type AppType = typeof routes;
