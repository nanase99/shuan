import { Hono } from "hono";
import { getSubjectsHandler } from "./getSubjects";
import { saveSubjectHandler } from "./saveSubjectHandler";

export const subjectsRoute = new Hono()
  .get("/", ...getSubjectsHandler)
  .post("/", ...saveSubjectHandler);
