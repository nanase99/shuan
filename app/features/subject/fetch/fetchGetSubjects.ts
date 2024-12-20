import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";

import { getApiClient } from "@/features/common/libs";
import { subjectKeys } from "./subjectKeys";

export function useGetSubjects() {
  const { data, isPending, isError } = useQuery({
    queryKey: subjectKeys.all,
    queryFn: fetcher,
  });
  return { data, isPending, isError };
}

export async function prefetchGetSubjects() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: subjectKeys.all,
    queryFn: fetcher,
  });
  return {
    dehydratedState: dehydrate(queryClient),
  };
}

async function fetcher() {
  const apiClient = getApiClient();
  const res = await apiClient.api.subjects.$get();

  if (!res.ok) throw new Error("Failed to fetch subjects");

  const { data } = await res.json();
  return data;
}
