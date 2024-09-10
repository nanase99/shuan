import { Hono } from "hono";
import { subjects } from "./subjects";

export const subjectsRoute = new Hono().route("/", subjects);
