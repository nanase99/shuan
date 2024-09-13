import type { Context, MiddlewareHandler } from "hono";
import { env } from "hono/adapter";
import { createMiddleware } from "hono/factory";

import {
  InMemorySubjectRepository,
  MockSubjectRepository,
  NeonSubjectRepository,
} from "@/repositories/subject";
import type { ServerEnv } from "@/types/common";
import { GetSubjectUseCase } from "@/useCases";

enum RepositoryEnvType {
  Mock = "Mock",
  InMemory = "InMemory",
  Stage = "Stage",
  Production = "Production",
}

type ArgEnv = {
  REPOSITORY_ENV: RepositoryEnvType;
  DATABASE_URL: string;
};

export function diSubjectMiddleware(): MiddlewareHandler {
  return createMiddleware<ServerEnv>(async (c, next) => {
    const { REPOSITORY_ENV, DATABASE_URL } = env<
      ArgEnv,
      Context<ServerEnv, any, {}>
    >(c);

    const repository = (() => {
      switch (REPOSITORY_ENV) {
        case RepositoryEnvType.InMemory: {
          return new InMemorySubjectRepository();
        }
        case RepositoryEnvType.Stage:
        case RepositoryEnvType.Production: {
          return new NeonSubjectRepository(DATABASE_URL);
        }
        case RepositoryEnvType.Mock: {
          return new MockSubjectRepository();
        }
        default: {
          return new MockSubjectRepository();
        }
      }
    })();

    c.set("getSubjectUseCase", new GetSubjectUseCase(repository));
    await next();
  });
}
