import {
  InMemorySubjectRepository,
  MockSubjectRepository,
  NeonSubjectRepository,
} from "@/repositories/subject";
import { Hono } from "hono";

const repository = (() => {
  switch (true) {
    case process.env.DB_ENV === "local": {
      return new InMemorySubjectRepository();
    }
    case process.env.DB_ENV === "development": {
      return new MockSubjectRepository();
    }
    case process.env.DB_ENV === "stage" || import.meta.env.PROD: {
      return new NeonSubjectRepository();
    }
    default: {
      throw new Error("invalid repository");
    }
  }
})();

export const subjects = new Hono().get("/", async (c) => {
  const data = await repository.findMany();

  return c.json({ data });
});
