import type { Context, MiddlewareHandler } from "hono";
import { env } from "hono/adapter";
import { createMiddleware } from "hono/factory";

import {
  LocalSubjectRepository,
  MockSubjectRepository,
  NeonSubjectRepository,
} from "@/features/subject/repositories";
import { GetSubjectUseCase } from "@/features/subject/useCases";
import { SaveSubjectUseCase } from "@/features/subject/useCases/saveSubjectUseCase";
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
    c.set("saveSubjectUseCase", new SaveSubjectUseCase(repository));
    await next();
  });
}
