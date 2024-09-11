import type { ServerEnv } from "@/types/common";
import type { Hono } from "hono";
import { subjectsRoute } from "./subjectsRoute";

export function setRoutes(server: Hono<ServerEnv>) {
  return server.basePath("/api").route("/subjects", subjectsRoute);
}
