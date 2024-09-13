import type { ISubjectRepository } from "@/domain/models";

export type ServerEnv = {
  Variables: { isProduction: boolean; subjectRepository: ISubjectRepository };
};
