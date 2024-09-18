import type { MiddlewareHandler } from "hono";

import { diSubjectMiddleware } from "./diSubjectMiddleware";

export function diMiddleware(): MiddlewareHandler[] {
  return [diSubjectMiddleware()];
}
