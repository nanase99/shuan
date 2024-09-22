import type {
  ISubjectRepository,
  Subject,
} from "@/features/subject/domain/models";
import {
  ClassHours,
  CompletedCourse,
  CompletedSubject,
  CourseName,
  Progress,
  SubjectName,
  UncompletedCourse,
  UncompletedSubject,
} from "@/features/subject/domain/models";

export class MockSubjectRepository implements ISubjectRepository {
  findMany = async () => mockSubjects;
  create = async (subject: Subject) => subject;
  deleteMany = async () => {};
}

const mockSubjects: { subjects: Subject[] } = {
  subjects: [
    new UncompletedSubject({
      id: "3539fc2e-c005-49bc-a12a-91bd4745e1a4",
      subjectName: new SubjectName("国語"),
      classHours: new ClassHours(10),
      progress: new Progress(2),
      courses: [
        new CompletedCourse({
          id: "efa1a443-8c2e-4325-9da1-b90abede639a",
          subjectId: "3539fc2e-c005-49bc-a12a-91bd4745e1a4",
          courseName: new CourseName("おおきなかぶ"),
          classHours: new ClassHours(5),
        }),
        new UncompletedCourse({
          id: "d55a6dfc-97f7-43e1-9b45-995c8bf50de5",
          subjectId: "3539fc2e-c005-49bc-a12a-91bd4745e1a4",
          courseName: new CourseName("ポプラの木"),
          classHours: new ClassHours(6),
          progress: new Progress(3),
        }),
      ],
    }),
    new CompletedSubject({
      id: "a43728a6-7dc6-43bc-a73c-668418106980",
      subjectName: new SubjectName("算数"),
      classHours: new ClassHours(12),
      courses: [
        new CompletedCourse({
          id: "b98a99f9-6e7d-4d04-acbe-91cf314ec87e",
          subjectId: "a43728a6-7dc6-43bc-a73c-668418106980",
          courseName: new CourseName("足し算"),
          classHours: new ClassHours(7),
        }),
        new CompletedCourse({
          id: "31f1f3b3-77cf-45fe-a578-99165b303d7b",
          subjectId: "a43728a6-7dc6-43bc-a73c-668418106980",
          courseName: new CourseName("引き算"),
          classHours: new ClassHours(5),
        }),
      ],
    }),
  ],
};
