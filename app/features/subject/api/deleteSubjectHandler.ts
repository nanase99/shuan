import { RowState } from "@/features/common/enums";
import type { ServerEnv } from "@/server/serverUtil";
import { vValidator } from "@hono/valibot-validator";
import { createFactory } from "hono/factory";
import * as v from "valibot";

const factory = createFactory<ServerEnv>();
const schema = v.object({
  id: v.string(),
});

export const deleteSubjectHandler = factory.createHandlers(
  vValidator("param", schema),
  async (c) => {
    const { id } = c.req.valid("param");

    if (!id) return c.json({ error: "id is required" }, 400);

    const data = await c.var.deleteSubjectUseCase.execute(id);

    return c.json({ data });
  },
);
