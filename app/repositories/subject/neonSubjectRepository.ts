import { ormClient } from "@/db/ormClient";
import { toDomainSubject } from "@/domain/dto/subjectDto/toDomainSubject";
import type { ISubjectRepository } from "@/domain/models";

export class NeonSubjectRepository implements ISubjectRepository {
  findMany = async () => {
    const data = await ormClient.query.subjects.findMany({
      with: { courses: true },
    });

    const subjects = data.map((subject) => toDomainSubject(subject));

    return { subjects };
  };
}
