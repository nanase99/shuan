import { type PostgresJsDatabase, drizzle } from "drizzle-orm/postgres-js";

import * as schema from "@/features/schema";
import { SubjectDto } from "@/features/subject/domain/dto";
import type {
  ISubjectRepository,
  Subject,
} from "@/features/subject/domain/models";
import postgres from "postgres";

export class LocalSubjectRepository implements ISubjectRepository {
  private _ormClient: PostgresJsDatabase<typeof schema>;
  constructor(databaseUrl: string) {
    this._ormClient = drizzle(postgres(databaseUrl), { schema });
  }

  findMany = async () => {
    const data = await this._ormClient.query.subjects.findMany({
      with: { courses: true },
    });

    const subjects = data.map((subject) => SubjectDto.toDomain(subject));

    return { subjects };
  };
}
