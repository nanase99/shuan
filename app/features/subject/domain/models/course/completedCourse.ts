import { AbstractCourse, CourseTag } from "./abstractCourse";

export class CompletedCourse extends AbstractCourse {
  public override readonly tag = CourseTag.Completed;
}
