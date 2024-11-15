import type { DeleteSubjectUseCase } from "./deleteSubjectUseCase/deleteSubjectUseCase";
import type { GetSubjectUseCase } from "./getSubjectUseCase";
import type { SaveSubjectUseCase } from "./saveSubjectUseCase";

export type SubjectUseCase = {
  getSubjectUseCase: GetSubjectUseCase;
  saveSubjectUseCase: SaveSubjectUseCase;
  deleteSubjectUseCase: DeleteSubjectUseCase;
};
