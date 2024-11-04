import type { ServerEnv } from "@/server/serverUtil";
import { createFactory } from "hono/factory";

const factory = createFactory<ServerEnv>();

export const saveSubjectHandler = factory.createHandlers(async (c) => {
  // TODO: バリデーションを追加する
  const values = await c.req.json();

  const data = await c.var.saveSubjectUseCase.execute(values);

  return c.json({ data });
});
