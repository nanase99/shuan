import { type Subject, SubjectTag } from "@/domain/models";
import { fromDomainCourse } from "./courseDto";
import type { SubjectDto } from "./subjectDto";

export function fromDomainSubjects(subject: Subject): SubjectDto {
  const propsByType = fromDomainPropsByType(subject);
  return {
    id: subject.id,
    subjectName: subject.subjectName.value,
    classHours: subject.classHours.value,
    tag: subject.type,
    courses: subject.courses.map((course) => fromDomainCourse(course)),
    ...propsByType,
  };
}

function fromDomainPropsByType(subject: Subject) {
  switch (subject.type) {
    case SubjectTag.Uncompleted: {
      return { progress: subject.progress.value };
    }
    case SubjectTag.Completed: {
      return { progress: subject.classHours.value };
    }
    default: {
      const unreachable: never = subject;
      return unreachable;
    }
  }
}
