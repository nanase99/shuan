import { afterEach, beforeEach, describe, expect, test } from "bun:test";
import { genUuid } from "@/features/common/libs";
import {
  ClassHours,
  CompletedCourse,
  CourseName,
  Progress,
  SubjectName,
  UncompletedCourse,
  UncompletedSubject,
} from "../../domain/models";
import { LocalSubjectRepository } from "./localSubjectRepository";
const DATABASE_URL = process.env.DATABASE_URL!;

describe("localRepository", () => {
  const localRepository = new LocalSubjectRepository(DATABASE_URL);
  LocalSubjectRepository;
  afterEach(async () => {
    await localRepository.deleteMany();
  });

  test("createできる", async () => {
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

    const res = await localRepository.create(subject);

    expect(res).toEqual(subject);
  });
});
