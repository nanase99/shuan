import { neon } from "@neondatabase/serverless";
import { type NeonHttpDatabase, drizzle } from "drizzle-orm/neon-http";

import * as schema from "@/features/schema";
import { SubjectDto } from "@/features/subject/domain/dto";
import type {
  ISubjectRepository,
  Subject,
} from "@/features/subject/domain/models";
import { eq } from "drizzle-orm";

export class NeonSubjectRepository implements ISubjectRepository {
  private _ormClient: NeonHttpDatabase<typeof schema>;
  constructor(databaseUrl: string) {
    this._ormClient = drizzle(neon(databaseUrl), { schema });
  }

  findMany = async () => {
    const data = await this._ormClient.query.subjects.findMany({
      with: { courses: true },
    });

    const res = data.map((subject) => SubjectDto.toDomain(subject));

    return res;
  };

  find = async (id: string) => {
    const data = await this._ormClient.query.subjects.findFirst({
      where: (subjects, { eq }) => eq(subjects.id, id),
      with: { courses: true },
    });
    const res = data ? SubjectDto.toDomain(data) : null;
    return res;
  };

  create = async (subject: Subject) => {
    const subjectDto = SubjectDto.fromDomain(subject);
    const { courses: coursesData, ...subjectData } = subjectDto;

    const [subjectsResult, coursesResults] = await Promise.all([
      this._ormClient.insert(schema.subjects).values(subjectData).returning(),
      this._ormClient.insert(schema.courses).values(coursesData).returning(),
    ]);

    return SubjectDto.toDomain({
      ...subjectsResult[0],
      courses: coursesResults,
    });
  };

  update = async (subject: Subject) => {
    const subjectDto = SubjectDto.fromDomain(subject);
    const { courses: coursesData, ...subjectData } = subjectDto;

    const [subjectsResult, ...coursesResults] = await Promise.all([
      this._ormClient
        .update(schema.subjects)
        .set(subjectData)
        .where(eq(schema.subjects.id, subjectData.id))
        .returning(),
      ...coursesData.map((course) =>
        this._ormClient
          .update(schema.courses)
          .set(course)
          .where(eq(schema.courses.id, course.id))
          .returning(),
      ),
    ]);

    return SubjectDto.toDomain({
      ...subjectsResult[0],
      courses: coursesResults.flat(),
    });
  };

  delete = async (id: string) => {
    const targetSubject = await this.find(id);
    if (targetSubject === null) return;

    await Promise.all([
      this._ormClient.delete(schema.subjects).where(eq(schema.subjects.id, id)),
      ...targetSubject.courses.map((course) =>
        this._ormClient
          .delete(schema.courses)
          .where(eq(schema.courses.id, course.id)),
      ),
    ]);
  };

  deleteMany = async () => {
    await Promise.all([
      this._ormClient.delete(schema.subjects),
      this._ormClient.delete(schema.courses),
    ]);
  };
}
