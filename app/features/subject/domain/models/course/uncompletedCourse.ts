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
};
export class UncompletedCourse extends AbstractCourse {
  private _progress: Progress;
  public override type = CourseTag.Uncompleted;

  constructor({ id, subjectId, courseName, classHours, progress }: Args) {
    super({ id, subjectId, courseName, classHours });
    this._progress = progress;
  }

  get progress(): Progress {
    return this._progress;
  }
}
