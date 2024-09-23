import { afterEach, beforeAll, describe, expect, test } from "bun:test";
import {
  ClassHours,
  CompletedCourse,
  CourseName,
  CourseTag,
  Progress,
  SubjectName,
  UncompletedCourse,
  UncompletedSubject,
} from "../../domain/models";
import { subjectsTestUtil } from "../subjectsTestUtil";
import { LocalSubjectRepository } from "./localSubjectRepository";
const DATABASE_URL = process.env.DATABASE_URL!;

describe("localRepository", () => {
  const localRepository = new LocalSubjectRepository(DATABASE_URL);
  LocalSubjectRepository;

  beforeAll(async () => {
    await localRepository.deleteMany();
  });
  afterEach(async () => {
    await localRepository.deleteMany();
  });

  test("createできる", async () => {
    const { testData } = subjectsTestUtil();

    const res = await localRepository.create(testData);
    expect(res.id).toEqual(testData.id);
    expect(res.subjectName.equals(testData.subjectName)).toBeTrue();
    expect(res.classHours.equals(testData.classHours)).toBeTrue();
    expect(res.tag).toEqual(testData.tag);
    res.courses.forEach((resCourse) => {
      const reqCourse = testData.courses.find(
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
    const { testData } = subjectsTestUtil();
    await localRepository.create(testData);

    const res = await localRepository.findMany();
    expect(res).toHaveLength(1);
    const [resData] = res;
    expect(resData.id).toEqual(testData.id);
    expect(resData.subjectName.equals(testData.subjectName)).toBeTrue();
    expect(resData.classHours.equals(testData.classHours)).toBeTrue();
    expect(resData.tag).toEqual(testData.tag);
    resData.courses.forEach((resCourse) => {
      const reqCourse = testData.courses.find(
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
    const { testData } = subjectsTestUtil();
    const createRes = await localRepository.create(testData);

    const res = await localRepository.find(createRes.id);
    expect(res).not.toBeNull();
    expect(res!.id).toEqual(testData.id);
    expect(res!.subjectName.equals(testData.subjectName)).toBeTrue();
    expect(res!.classHours.equals(testData.classHours)).toBeTrue();
    expect(res!.tag).toEqual(testData.tag);
    res!.courses.forEach((resCourse) => {
      const reqCourse = testData.courses.find(
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

  test("updateできる", async () => {
    const { testData } = subjectsTestUtil();
    const createRes = await localRepository.create(testData);

    const updateSubject = new UncompletedSubject({
      id: createRes.id,
      subjectName: new SubjectName("算数"),
      classHours: new ClassHours(10),
      progress: new Progress(7),
      courses: createRes.courses.map(({ tag, id, subjectId }) => {
        switch (tag) {
          case CourseTag.Completed: {
            return new CompletedCourse({
              id: id,
              courseName: new CourseName("足し算"),
              classHours: new ClassHours(5),
              subjectId: subjectId,
            });
          }
          case CourseTag.Uncompleted: {
            return new UncompletedCourse({
              id: id,
              courseName: new CourseName("引き算"),
              classHours: new ClassHours(5),
              progress: new Progress(0),
              subjectId: subjectId,
            });
          }
          default: {
            const unreachable: never = tag;
            return unreachable;
          }
        }
      }),
    });

    const updateRes = await localRepository.update(updateSubject);
    expect(updateRes.id).toEqual(updateSubject.id);
    expect(updateRes.subjectName.equals(updateSubject.subjectName)).toBeTrue();
    expect(updateRes.classHours.equals(updateSubject.classHours)).toBeTrue();
    expect(updateRes.tag).toEqual(updateSubject.tag);
    updateRes.courses.forEach((resCourse) => {
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

  test("1件deleteできる", async () => {
    const { testData } = subjectsTestUtil();
    await localRepository.create(testData);
    await localRepository.delete(testData.id);
    const getRes = await localRepository.find(testData.id);
    expect(getRes).toBeNull();
  });

  test("全件deleteできる", async () => {
    const { testData } = subjectsTestUtil();
    await localRepository.create(testData);
    await localRepository.deleteMany();
    const getRes = await localRepository.findMany();
    expect(getRes).toHaveLength(0);
  });
});
