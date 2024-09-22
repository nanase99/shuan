import type { ClassHours, SubjectName } from "@/features/subject/domain/models";
import type { Course } from "../course";

type Args = {
  id: string;
  subjectName: SubjectName;
  classHours: ClassHours;
  courses: Course[];
};

export enum SubjectTag {
  Uncompleted = "Uncompleted",
  Completed = "Completed",
}

export abstract class AbstractSubject {
  protected readonly _id: string;
  protected _subjectName: SubjectName;
  protected _classHours: ClassHours;
  protected _courses: Course[];
  public abstract readonly tag: SubjectTag;

  constructor({ id, subjectName, classHours, courses }: Args) {
    this._id = id;
    this._subjectName = subjectName;
    this._classHours = classHours;
    this._courses = courses;
  }

  get id(): string {
    return this._id;
  }

  get subjectName(): SubjectName {
    return this._subjectName;
  }

  get classHours(): ClassHours {
    return this._classHours;
  }

  get courses(): Course[] {
    return this._courses;
  }
}
