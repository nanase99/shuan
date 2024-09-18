import { Hono } from "hono";
import { getSubjectsHandler } from "./getSubjects";

export const subjectsRoute = new Hono().get("/", ...getSubjectsHandler);
