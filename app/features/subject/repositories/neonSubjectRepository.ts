import { neon } from "@neondatabase/serverless";
import { type NeonHttpDatabase, drizzle } from "drizzle-orm/neon-http";

import * as schema from "@/features/schema";
import { SubjectDto } from "@/features/subject/domain/dto";
import type {
  ISubjectRepository,
  Subject,
} from "@/features/subject/domain/models";

export class NeonSubjectRepository implements ISubjectRepository {
  private _ormClient: NeonHttpDatabase<typeof schema>;
  constructor(databaseUrl: string) {
    this._ormClient = drizzle(neon(databaseUrl), { schema });
  }

  findMany = async () => {
    const data = await this._ormClient.query.subjects.findMany({
      with: { courses: true },
    });

    const subjects = data.map((subject) => SubjectDto.toDomain(subject));

    return { subjects };
  };

  create = async (subject: Subject) => {
    const subjectDto = SubjectDto.fromDomain(subject);
    const { courses: coursesData, ...subjectData } = subjectDto;

    const subjectsResult = await this._ormClient
      .insert(schema.subjects)
      .values(subjectData)
      .returning();

    const coursesResults = await this._ormClient
      .insert(schema.courses)
      .values(coursesData)
      .returning();

    return SubjectDto.toDomain({
      ...subjectsResult[0],
      courses: coursesResults,
    });
  };

  deleteMany = async () => {
    await Promise.all([
      this._ormClient.delete(schema.subjects),
      this._ormClient.delete(schema.courses),
    ]);
  };
}
