import { Hono } from "hono";
import { getSubjectsHandler } from "./subjects";

export const subjectsRoute = new Hono().get("/", ...getSubjectsHandler);
