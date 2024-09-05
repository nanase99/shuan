import type { Hono } from "hono";
import { mockSubjectsRoute, subjectsRoute } from "./subjectsRoute";

export function setRoutes(app: Hono) {
  return app.basePath("/api").route("/subjects", subjectsRoute);
}

export function setMockRoutes(app: Hono) {
  return app.basePath("/api").route("/subjects", mockSubjectsRoute);
}
