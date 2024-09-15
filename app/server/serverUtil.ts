import type { SubjectUseCase } from "@/features/subject/useCases";

export enum Repository {
  Mock = "mock",
  Local = "local",
  Stage = "stage",
  Production = "production",
}

export type ArgEnv = {
  REPOSITORY_ENV: Repository;
  DATABASE_URL: string;
};

export type ServerEnv = {
  Variables: { isProduction: boolean } & SubjectUseCase;
};
