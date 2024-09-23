import { genUuid } from "@/features/common/libs";
import {
  ClassHours,
  CompletedCourse,
  CourseName,
  Progress,
  SubjectName,
  UncompletedCourse,
  UncompletedSubject,
} from "../domain/models";

export function subjectsTestUtil() {
  return { testData: subject };
}

const subjectId = genUuid();
const courses = [
  new UncompletedCourse({
    id: genUuid(),
    courseName: new CourseName("おおきなかぶ"),
    classHours: new ClassHours(5),
    progress: new Progress(0),
    subjectId,
  }),
  new CompletedCourse({
    id: genUuid(),
    courseName: new CourseName("ポプラの木"),
    classHours: new ClassHours(5),
    subjectId,
  }),
];

const subject = new UncompletedSubject({
  id: subjectId,
  subjectName: new SubjectName("国語"),
  classHours: new ClassHours(15),
  progress: new Progress(5),
  courses,
});
