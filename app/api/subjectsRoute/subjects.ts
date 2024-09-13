import { createFactory } from "hono/factory";

import type { ServerEnv } from "@/types/common";

const factory = createFactory<ServerEnv>();

export const getSubjectsHandler = factory.createHandlers(async (c) => {
  const repository = c.var.subjectRepository;

  const data = await repository.findMany();

  return c.json({ data });
});
