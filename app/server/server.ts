import { Hono } from "hono";
import { contextStorage } from "hono/context-storage";
import { poweredBy } from "hono/powered-by";

import type { ServerEnv } from "@/types/common";
import {
  authMiddleware,
  diMiddleware,
  remixMiddleware,
  staticAssetsMiddleware,
} from "./middlewares";

// TODO: assetsのパスを変換する

const server = new Hono<ServerEnv>();

server.use(contextStorage());

server.use(poweredBy());

server.use(staticAssetsMiddleware());

server.use(authMiddleware());

server.use(...diMiddleware());

server.use(remixMiddleware());

export default server;
