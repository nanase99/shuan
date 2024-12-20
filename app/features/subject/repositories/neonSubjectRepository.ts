import { neon } from "@neondatabase/serverless";
import { type NeonHttpDatabase, drizzle } from "drizzle-orm/neon-http";

import { RowState } from "@/features/common/enums";
import * as schema from "@/features/schema";
import { SubjectDto } from "@/features/subject/domain/dto";
import type { Subject } from "@/features/subject/domain/models";
import { eq, inArray } from "drizzle-orm";
import type { ISubjectRepository } from "./ISubjectRepository";

export class NeonSubjectRepository implements ISubjectRepository {
  private _ormClient: NeonHttpDatabase<typeof schema>;
  constructor(databaseUrl: string) {
    this._ormClient = drizzle(neon(databaseUrl), { schema });
  }

  findMany = async () => {
    const data = await this._ormClient.query.subjects.findMany({
      with: { courses: true },
    });

    const res = data.map((subject) =>
      SubjectDto.toDomain({
        ...subject,
        courses: subject.courses.map((course) => ({
          ...course,
          rowState: RowState.Unchanged,
        })),
      }),
    );

    return res;
  };
  find = async (id: string) => {
    const data = await this._ormClient.query.subjects.findFirst({
      where: (subjects, { eq }) => eq(subjects.id, id),
      with: { courses: true },
    });
    const res = data
      ? SubjectDto.toDomain({
          ...data,
          courses: data.courses.map((course) => ({
            ...course,
            rowState: RowState.Unchanged,
          })),
        })
      : null;
    return res;
  };

  save = async (subject: Subject) => {
    const subjectDto = SubjectDto.fromDomain(subject);
    const { courses: coursesData, ...subjectData } = subjectDto;
    const createCourses = coursesData.filter(
      (course) => course.rowState === RowState.Added,
    );
    const updateCourses = coursesData.filter(
      (course) => course.rowState === RowState.Updated,
    );
    const deleteCourses = coursesData.filter(
      (course) => course.rowState === RowState.Deleted,
    );

    const { subjectsResults, insertCoursesResults, updateCoursesResults } =
      await this._ormClient.transaction(async (tx) => {
        const [
          subjectsResults,
          _,
          insertCoursesResults,
          ...updateCoursesResults
        ] = await Promise.all([
          tx
            .insert(schema.subjects)
            .values(subjectData)
            .onConflictDoUpdate({
              target: schema.subjects.id,
              set: subjectData,
            })
            .returning(),
          tx.delete(schema.courses).where(
            inArray(
              schema.courses.id,
              deleteCourses.map((c) => c.id),
            ),
          ),
          createCourses.length !== 0
            ? tx.insert(schema.courses).values(createCourses).returning()
            : [],
          ...updateCourses.map((course) =>
            tx
              .update(schema.courses)
              .set(course)
              .where(eq(schema.courses.id, course.id))
              .returning(),
          ),
        ]);
        return { subjectsResults, insertCoursesResults, updateCoursesResults };
      });

    return SubjectDto.toDomain({
      ...subjectsResults[0],
      courses: [
        ...insertCoursesResults.map((r) => ({
          ...r,
          rowState: RowState.Unchanged,
        })),
        ...updateCoursesResults.flatMap((r) =>
          r.map((course) => ({
            ...course,
            rowState: RowState.Unchanged,
          })),
        ),
      ],
    });
  };

  delete = async (id: string) => {
    const targetSubject = await this.find(id);
    if (targetSubject === null) throw new Error("Subject not found");

    const deletedId = await this._ormClient.transaction(async (tx) => {
      const [[deletedSubject]] = await Promise.all([
        tx
          .delete(schema.subjects)
          .where(eq(schema.subjects.id, id))
          .returning({ id: schema.subjects.id }),
        ...targetSubject.courses.map((course) =>
          tx.delete(schema.courses).where(eq(schema.courses.id, course.id)),
        ),
      ]);
      return deletedSubject.id;
    });
    return deletedId;
  };

  deleteMany = async () => {
    await Promise.all([
      this._ormClient.delete(schema.subjects),
      this._ormClient.delete(schema.courses),
    ]);
  };
}
