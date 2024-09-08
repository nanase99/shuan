import {
  ClassHours,
  CompletedSubject,
  Progress,
  type Subject,
  SubjectName,
  SubjectTag,
  UncompletedSubject,
} from "@/domain/models";
import { toDomainCourse } from "./courseDto";
import type { SubjectDto } from "./subjectDto";

export function toDomainSubject(subjectDto: SubjectDto): Subject {
  switch (subjectDto.tag) {
    case SubjectTag.Uncompleted: {
      return new UncompletedSubject({
        id: subjectDto.id,
        subjectName: new SubjectName(subjectDto.subjectName),
        classHours: new ClassHours(subjectDto.classHours),
        progress: new Progress(subjectDto.progress),
        courses: subjectDto.courses.map((course) => toDomainCourse(course)),
      });
    }
    case SubjectTag.Completed: {
      return new CompletedSubject({
        id: subjectDto.id,
        subjectName: new SubjectName(subjectDto.subjectName),
        classHours: new ClassHours(subjectDto.classHours),
        courses: subjectDto.courses.map((course) => toDomainCourse(course)),
      });
    }
    default: {
      throw new Error("invalid course.type");
    }
  }
}
