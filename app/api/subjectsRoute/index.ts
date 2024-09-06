import { Hono } from "hono";
import { mockSubjects, subjects } from "./subjects";

export const subjectsRoute = new Hono().route("/", subjects);

export const mockSubjectsRoute = new Hono().route("/", mockSubjects);
