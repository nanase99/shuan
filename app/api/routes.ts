import type { Hono } from "hono";
import { subjectsRoute } from "./subjectsRoute";

export function setRoutes(app: Hono) {
  return app.basePath("/api").route("/subjects", subjectsRoute);
}
