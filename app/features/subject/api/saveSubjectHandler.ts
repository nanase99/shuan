import { RowState } from "@/features/common/enums";
import type { ServerEnv } from "@/server/serverUtil";
import { vValidator } from "@hono/valibot-validator";
import { createFactory } from "hono/factory";
import * as v from "valibot";

const factory = createFactory<ServerEnv>();
const schema = v.object({
  id: v.string(),
  subjectName: v.pipe(
    v.string(),
    v.nonEmpty("科目名を入力してください"),
    v.maxLength(10, "科目名は10文字以下で入力してください"),
  ),
  classHours: v.number(),
  progress: v.number(),
  tag: v.string(),
  courses: v.array(
    v.object({
      id: v.string(),
      subjectId: v.string(),
      courseName: v.pipe(v.string(), v.nonEmpty(), v.maxLength(10)),
      classHours: v.number(),
      progress: v.number(),
      tag: v.string(),
      rowState: v.enum(RowState),
    }),
  ),
});

export const saveSubjectHandler = factory.createHandlers(
  vValidator("json", schema),
  async (c) => {
    const values = c.req.valid("json");

    const data = await c.var.saveSubjectUseCase.execute(values);

    return c.json({ data });
  },
);
