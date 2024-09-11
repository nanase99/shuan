import { RepositoryEnvType, ServerEnvKey } from "@/enums/common";
import type { MiddlewareHandler } from "hono";
import { env } from "hono/adapter";

type ArgEnv = {
  NODE_ENV: string;
  REPOSITORY_ENV: RepositoryEnvType;
  DATABASE_URL: string;
};

const dbRepositoryTypes = [
  RepositoryEnvType.Stage,
  RepositoryEnvType.Production,
];

export function envMiddleware(): MiddlewareHandler {
  return async (c, next) => {
    const envParams = env<ArgEnv>(c);

    c.set(
      ServerEnvKey.IsProduction,
      envParams.NODE_ENV === "production" || import.meta.env.PROD,
    );

    c.set(ServerEnvKey.RepositoryEnv, envParams.REPOSITORY_ENV);

    if (dbRepositoryTypes.includes(envParams.REPOSITORY_ENV)) {
      c.set(ServerEnvKey.DbUrl, envParams.DATABASE_URL);
    }

    await next();
  };
}
