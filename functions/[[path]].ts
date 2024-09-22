import { handle } from "hono/cloudflare-pages";
import server from "../app/server/server";
export const onRequest = handle(server);
