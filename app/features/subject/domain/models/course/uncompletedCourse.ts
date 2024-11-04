import type { RowState } from "@/features/common/enums";
import type {
  ClassHours,
  CourseName,
  Progress,
} from "@/features/subject/domain/models";
import { AbstractCourse, CourseTag } from "./abstractCourse";

type Args = {
  id: string;
  subjectId: string;
  courseName: CourseName;
  classHours: ClassHours;
  progress: Progress;
  rowState: RowState;
};
export class UncompletedCourse extends AbstractCourse {
  private _progress: Progress;
  public override tag = CourseTag.Uncompleted;

  constructor({
    id,
    subjectId,
    courseName,
    classHours,
    progress,
    rowState,
  }: Args) {
    super({ id, subjectId, courseName, classHours, rowState });
    this._progress = progress;
  }

  get progress(): Progress {
    return this._progress;
  }
}
