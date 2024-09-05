import { Hono } from "hono";
import { getSubjects, mockGetSubjects } from "./getSubjects";

export const subjectsRoute = new Hono().route("/", getSubjects);

export const mockSubjectsRoute = new Hono().route("/", mockGetSubjects);
