import type { SubjectUseCase } from "@/features/subject/useCases";

export enum Repository {
  Mock = "mock",
  Memory = "memory",
  Local = "local",
  Production = "production",
}

export type ArgEnv = {
  REPOSITORY_ENV: Repository;
  DATABASE_URL: string;
};

export type ServerEnv = {
  Bindings: {
    CLERK_PUBLISHABLE_KEY: string;
    CLERK_SECRET_KEY: string;
  };
  Variables: SubjectUseCase;
};
