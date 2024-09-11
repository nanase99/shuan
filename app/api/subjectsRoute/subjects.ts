import { createFactory } from "hono/factory";

import { RepositoryEnvType } from "@/enums/common";
import {
  InMemorySubjectRepository,
  MockSubjectRepository,
  NeonSubjectRepository,
} from "@/repositories/subject";
import type { ServerEnv } from "@/types/common";

const factory = createFactory<ServerEnv>();

export const getSubjectsHandler = factory.createHandlers(async (c) => {
  const repository = (() => {
    switch (c.var.repositoryEnv) {
      case RepositoryEnvType.Mock: {
        return new MockSubjectRepository();
      }
      case RepositoryEnvType.InMemory: {
        return new InMemorySubjectRepository();
      }
      case RepositoryEnvType.Stage:
      case RepositoryEnvType.Production: {
        return new NeonSubjectRepository(c.var.dbUrl);
      }
      default: {
        return new MockSubjectRepository();
      }
    }
  })();

  const data = await repository.findMany();

  return c.json({ data });
});
