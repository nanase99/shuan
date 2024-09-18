import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";

import { getApiClient } from "@/features/common/libs";
import { subjectKeys } from "./subjectKeys";

export function fetchGetSubjects() {
  const useGetSubjects = () => {
    const { data, isPending, isError } = useQuery({
      queryKey: subjectKeys.all,
      queryFn: fetcher,
    });
    return { data, isPending, isError };
  };

  const prefetchGetSubjects = async () => {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
      queryKey: subjectKeys.all,
      queryFn: fetcher,
    });
    return {
      dehydratedState: dehydrate(queryClient),
    };
  };

  return { useGetSubjects, prefetchGetSubjects };
}

async function fetcher() {
  const apiClient = getApiClient();
  const res = await apiClient.api.subjects.$get();

  if (!res.ok) throw new Error("Failed to fetch subjects");

  const { data } = await res.json();
  return data;
}
