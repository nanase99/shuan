import { subjectsRoute } from "@/features/subject/apiRoutes";
import type { Hono } from "hono";
import type { ServerEnv } from "./serverUtil";

export function setRoutes(server: Hono<ServerEnv>) {
  return server.basePath("/api").route("/subjects", subjectsRoute);
}