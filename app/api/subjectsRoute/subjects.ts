import {
  InMemorySubjectRepository,
  MockSubjectRepository,
  OrmSubjectRepository
} from "@/repositories/subject";
import { Hono } from "hono";

const repository = (() => {
  switch (true) {
    case process.env.DB_ENV === "stage": {
      return new OrmSubjectRepository();
    }
    case process.env.DB_ENV === "local": {
      return new InMemorySubjectRepository();
    }
    default: {
      return new MockSubjectRepository();
    }
  }
})();

export const subjects = new Hono().get("/", async (c) => {
  const data = await repository.findMany();

  return c.json({ data });
});
