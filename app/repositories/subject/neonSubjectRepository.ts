import { neon } from "@neondatabase/serverless";
import { type NeonHttpDatabase, drizzle } from "drizzle-orm/neon-http";

import * as schema from "@/db/schemas";
import { toDomainSubject } from "@/domain/dto";
import type { ISubjectRepository } from "@/domain/models";

export class NeonSubjectRepository implements ISubjectRepository {
  private _ormClient: NeonHttpDatabase<typeof schema>;

  constructor(url: string) {
    this._ormClient = drizzle(neon(url), { schema });
  }

  findMany = async () => {
    const data = await this._ormClient.query.subjects.findMany({
      with: { courses: true },
    });

    const subjects = data.map((subject) => toDomainSubject(subject));

    return { subjects };
  };
}
