import { Hono } from "hono";
import { deleteSubjectHandler } from "./deleteSubjectHandler";
import { getSubjectsHandler } from "./getSubjectsHandler";
import { saveSubjectHandler } from "./saveSubjectHandler";

export const subjectsRoute = new Hono()
  .get("/", ...getSubjectsHandler)
  .post("/", ...saveSubjectHandler)
  .delete(":id", ...deleteSubjectHandler);
