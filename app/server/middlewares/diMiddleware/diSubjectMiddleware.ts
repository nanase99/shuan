import type { Context, MiddlewareHandler } from "hono";
import { env } from "hono/adapter";
import { createMiddleware } from "hono/factory";

import {
  InMemorySubjectRepository,
  LocalSubjectRepository,
  MockSubjectRepository,
  NeonSubjectRepository,
} from "@/features/subject/repositories";
import { GetSubjectUseCase } from "@/features/subject/useCases";
import { type ArgEnv, Repository, type ServerEnv } from "@/server/serverUtil";

export function diSubjectMiddleware(): MiddlewareHandler {
  return createMiddleware<ServerEnv>(async (c, next) => {
    const { REPOSITORY_ENV, DATABASE_URL } = env<
      ArgEnv,
      Context<ServerEnv, any, {}>
    >(c);

    const repository = (() => {
      switch (REPOSITORY_ENV) {
        case Repository.Mock: {
          return new MockSubjectRepository();
        }
        case Repository.Memory: {
          return new InMemorySubjectRepository();
        }
        case Repository.Local: {
          return new LocalSubjectRepository(DATABASE_URL);
        }
        case Repository.Production: {
          return new NeonSubjectRepository(DATABASE_URL);
        }
        default: {
          throw new Error(`invalid REPOSITORY_ENV ${REPOSITORY_ENV}`);
        }
      }
    })();

    c.set("getSubjectUseCase", new GetSubjectUseCase(repository));
    await next();
  });
}
