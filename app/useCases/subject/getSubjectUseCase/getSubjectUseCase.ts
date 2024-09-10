import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";

import { apiClient } from "@/libs";
import { subjectKeys } from "../subjectKeys";

export const getSubjectUseCase = {
  useGetSubjects: () => {
    // TODO: ドメインオブジェクトからDTOへ変換して返す
    const { data, isPending, isError } = useQuery({
      queryKey: subjectKeys.all,
      queryFn: fetchGetSubjects,
    });
    return { data, isPending, isError };
  },

  executePrefetch: async () => {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
      queryKey: subjectKeys.all,
      queryFn: fetchGetSubjects,
    });

    return { dehydratedState: dehydrate(queryClient) };
  },
};

const fetchGetSubjects = async () => {
  const res = await apiClient.api.subjects.$get();

  if (!res.ok) throw new Error("Failed to fetch subjects");

  const { data } = await res.json();
  return data;
};
