import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";

import { fromDomainSubjects } from "@/domain/dto";
import type { ISubjectRepository } from "@/domain/models";
import { subjectKeys } from "../subjectKeys";

export class GetSubjectUseCase {
  private _repository: ISubjectRepository;
  private _fetchGetSubjects = async () => {
    const res = await this._repository.findMany();

    const subjectsDto = res.subjects.map((subject) =>
      fromDomainSubjects(subject),
    );

    return { subjects: subjectsDto };
  };

  constructor(repository: ISubjectRepository) {
    this._repository = repository;
  }

  public useGetSubjects = () => {
    const { data, isPending, isError } = useQuery({
      queryKey: subjectKeys.all,
      queryFn: this._fetchGetSubjects,
    });
    return { data, isPending, isError };
  };

  public executePrefetch = async () => {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
      queryKey: subjectKeys.all,
      queryFn: this._fetchGetSubjects,
    });

    return {
      dehydratedState: dehydrate(queryClient),
    };
  };
}
