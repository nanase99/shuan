import { afterEach, beforeAll, describe, expect, test } from "bun:test";
import { RowState } from "@/features/common/enums";
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

const subjectId = "f6ea1232-bba1-4ce2-8cda-1d1f5b3f65ef";
const course1 = new UncompletedCourse({
  id: "96bceb4e-ed49-4183-afb7-0cb374fa9ce1",
  courseName: new CourseName("おおきなかぶ"),
  classHours: new ClassHours(5),
  progress: new Progress(0),
  subjectId,
  rowState: RowState.Added,
});
const course2 = new CompletedCourse({
  id: "d64a3b06-da33-4175-87d7-992ea20d3379",
  courseName: new CourseName("ポプラの木"),
  classHours: new ClassHours(5),
  subjectId,
  rowState: RowState.Added,
});

const subjectData = new UncompletedSubject({
  id: subjectId,
  subjectName: new SubjectName("国語"),
  classHours: new ClassHours(15),
  progress: new Progress(5),
  courses: [course1, course2],
});

describe("localRepository", () => {
  const localRepository = new LocalSubjectRepository(DATABASE_URL);
  LocalSubjectRepository;

  beforeAll(async () => {
    await localRepository.deleteMany();
  });
  afterEach(async () => {
    await localRepository.deleteMany();
  });

  test("saveできる", async () => {
    const res = await localRepository.save(subjectData);
    expect(res.id).toEqual(subjectData.id);
    expect(res.subjectName.equals(subjectData.subjectName)).toBeTrue();
    expect(res.classHours.equals(subjectData.classHours)).toBeTrue();
    expect(res.tag).toEqual(subjectData.tag);
    res.courses.forEach((resCourse) => {
      const reqCourse = subjectData.courses.find(
        (course) => course.id === resCourse.id,
      );
      expect(reqCourse).toBeTruthy();
      expect(resCourse.id).toEqual(reqCourse!.id);
      expect(resCourse.subjectId).toEqual(reqCourse!.subjectId);
      expect(resCourse.courseName.equals(reqCourse!.courseName));
      expect(resCourse.classHours.equals(reqCourse!.classHours));
      expect(resCourse.tag).toEqual(reqCourse!.tag);
    });

    const updateSubject = new UncompletedSubject({
      id: subjectId,
      subjectName: new SubjectName("国語2"),
      classHours: new ClassHours(15),
      progress: new Progress(5),
      courses: [
        new UncompletedCourse({
          id: "96bceb4e-ed49-4183-afb7-0cb374fa9ce1",
          courseName: new CourseName("おおきなかぶ2"),
          classHours: new ClassHours(5),
          progress: new Progress(0),
          subjectId,
          rowState: RowState.Updated,
        }),
        new CompletedCourse({
          id: "d64a3b06-da33-4175-87d7-992ea20d3379",
          courseName: new CourseName("ポプラの木"),
          classHours: new ClassHours(5),
          subjectId,
          rowState: RowState.Deleted,
        }),
      ],
    });

    const updateRes = await localRepository.save(updateSubject);
    expect(updateRes.id).toEqual(updateSubject.id);
    expect(updateRes.subjectName.equals(updateSubject.subjectName)).toBeTrue();
    expect(updateRes.classHours.equals(updateSubject.classHours)).toBeTrue();
    expect(updateRes.tag).toEqual(updateSubject.tag);

    expect(updateRes.courses.length).toEqual(1);
    res.courses.forEach((resCourse) => {
      const reqCourse = updateSubject.courses.find(
        (course) => course.id === resCourse.id,
      );
      expect(reqCourse).toBeTruthy();
      expect(resCourse.id).toEqual(reqCourse!.id);
      expect(resCourse.subjectId).toEqual(reqCourse!.subjectId);
      expect(resCourse.courseName.equals(reqCourse!.courseName));
      expect(resCourse.classHours.equals(reqCourse!.classHours));
      expect(resCourse.tag).toEqual(reqCourse!.tag);
    });
  });

  test("全件findできる", async () => {
    await localRepository.save(subjectData);

    const res = await localRepository.findMany();
    expect(res).toHaveLength(1);
    const [resData] = res;
    expect(resData.id).toEqual(subjectData.id);
    expect(resData.subjectName.equals(subjectData.subjectName)).toBeTrue();
    expect(resData.classHours.equals(subjectData.classHours)).toBeTrue();
    expect(resData.tag).toEqual(subjectData.tag);
    resData.courses.forEach((resCourse) => {
      const reqCourse = subjectData.courses.find(
        (course) => course.id === resCourse.id,
      );
      expect(reqCourse).toBeTruthy();
      expect(resCourse.id).toEqual(reqCourse!.id);
      expect(resCourse.subjectId).toEqual(reqCourse!.subjectId);
      expect(resCourse.courseName.equals(reqCourse!.courseName));
      expect(resCourse.classHours.equals(reqCourse!.classHours));
      expect(resCourse.tag).toEqual(reqCourse!.tag);
    });
  });

  test("1件findできる", async () => {
    const createRes = await localRepository.save(subjectData);

    const res = await localRepository.find(createRes.id);
    expect(res).not.toBeNull();
    expect(res!.id).toEqual(subjectData.id);
    expect(res!.subjectName.equals(subjectData.subjectName)).toBeTrue();
    expect(res!.classHours.equals(subjectData.classHours)).toBeTrue();
    expect(res!.tag).toEqual(subjectData.tag);
    res!.courses.forEach((resCourse) => {
      const reqCourse = subjectData.courses.find(
        (course) => course.id === resCourse.id,
      );
      expect(reqCourse).toBeTruthy();
      expect(resCourse.id).toEqual(reqCourse!.id);
      expect(resCourse.subjectId).toEqual(reqCourse!.subjectId);
      expect(resCourse.courseName.equals(reqCourse!.courseName));
      expect(resCourse.classHours.equals(reqCourse!.classHours));
      expect(resCourse.tag).toEqual(reqCourse!.tag);
    });
  });

  test("1件deleteできる", async () => {
    await localRepository.save(subjectData);
    await localRepository.delete(subjectData.id);
    const getRes = await localRepository.find(subjectData.id);
    expect(getRes).toBeNull();
  });

  test("全件deleteできる", async () => {
    await localRepository.save(subjectData);
    await localRepository.deleteMany();
    const getRes = await localRepository.findMany();
    expect(getRes).toHaveLength(0);
  });
});
