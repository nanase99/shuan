import type { ClassHours, SubjectName } from "@/domain/models/valueObjects";
import type { Course } from "./course";

export abstract class AbstractSubject {
  protected readonly _id: string;
  protected _subjectName: SubjectName;
  protected _classHours: ClassHours;
  protected _courses: Course[];

  constructor(
    id: string,
    subjectName: SubjectName,
    classHours: ClassHours,
    courses: Course[],
  ) {
    this._id = id;
    this._subjectName = subjectName;
    this._classHours = classHours;
    this._courses = courses;
  }
}
