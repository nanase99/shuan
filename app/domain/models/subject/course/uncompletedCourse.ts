import type {
  ClassHours,
  CourseName,
  Progress,
} from "@/domain/models/valueObjects";
import { AbstractCourse } from "./abstractCourse";

export class UncompletedCourse extends AbstractCourse {
  private _progress: Progress;

  constructor(
    id: string,
    subjectId: string,
    courseName: CourseName,
    classHours: ClassHours,
    progress: Progress,
  ) {
    super(id, subjectId, courseName, classHours);
    this._progress = progress;
  }

  get progress(): Progress {
    return this._progress;
  }
}
