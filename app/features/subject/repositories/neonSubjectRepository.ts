import { neon } from "@neondatabase/serverless";
import { type NeonHttpDatabase, drizzle } from "drizzle-orm/neon-http";

import { toDomainSubject } from "@/features/subject/domain/dto";
import type { ISubjectRepository } from "@/features/subject/domain/models";
import * as schema from "@/features/subject/schemas";

export class NeonSubjectRepository implements ISubjectRepository {
  private _ormClient: NeonHttpDatabase<typeof schema>;

  constructor(databaseUrl: string) {
    this._ormClient = drizzle(neon(databaseUrl), { schema });
  }

  findMany = async () => {
    const data = await this._ormClient.query.subjects.findMany({
      with: { courses: true },
    });

    const subjects = data.map((subject) => toDomainSubject(subject));

    return { subjects };
  };
}
