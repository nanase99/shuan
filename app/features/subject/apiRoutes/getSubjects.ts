import { createFactory } from "hono/factory";

import type { ServerEnv } from "@/server/serverUtil";

const factory = createFactory<ServerEnv>();

export const getSubjectsHandler = factory.createHandlers(async (c) => {
  const data = await c.var.getSubjectUseCase.execute();

  return c.json({ data });
});
