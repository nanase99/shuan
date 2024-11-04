import { getApiClient } from "@/features/common/libs";
import { useMutation } from "@tanstack/react-query";

export function fetchSaveSubject() {
  const useSaveSubject = () => {
    const mutation = useMutation({
      mutationFn: async (json) => {
        const response = getApiClient().api.subjects.$post({ json });
        return (await response).json();
      },
    });
    return mutation;
  };

  return { useSaveSubject };
}
