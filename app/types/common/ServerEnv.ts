import type { RepositoryEnvType, ServerEnvKey } from "@/enums/common";

export type ServerEnv = {
  Variables:
    | {
        [ServerEnvKey.IsProduction]: boolean;
        [ServerEnvKey.RepositoryEnv]:
          | RepositoryEnvType.Mock
          | RepositoryEnvType.InMemory;
      }
    | {
        [ServerEnvKey.IsProduction]: boolean;
        [ServerEnvKey.RepositoryEnv]:
          | RepositoryEnvType.Production
          | RepositoryEnvType.Stage;
        [ServerEnvKey.DbUrl]: string;
      };
};
