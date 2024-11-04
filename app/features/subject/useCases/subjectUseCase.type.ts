import type { GetSubjectUseCase } from "./getSubjectUseCase";
import type { SaveSubjectUseCase } from "./saveSubjectUseCase";

export type SubjectUseCase = {
  getSubjectUseCase: GetSubjectUseCase;
  saveSubjectUseCase: SaveSubjectUseCase;
};
