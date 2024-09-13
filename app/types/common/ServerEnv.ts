import type { SubjectUseCaseType } from "@/useCases/subject";

export type ServerEnv = {
  Variables: { isProduction: boolean } & SubjectUseCaseType;
};
