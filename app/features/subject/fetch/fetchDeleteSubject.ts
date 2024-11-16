import { getApiClient } from "@/features/common/libs";
import { useMutation } from "@tanstack/react-query";
import type { InferResponseType } from "hono";
import { toast } from "sonner";

const client = getApiClient();
type ResponseType = InferResponseType<
  (typeof client.api.subjects)[":id"]["$delete"]
>;

export function useDeleteSubject() {
  const mutation = useMutation<ResponseType, Error, string>({
    mutationFn: async (id) => {
      const response = await client.api.subjects[":id"].$delete({
        param: { id },
      });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("保存しました");
    },
    onError: () => {
      toast.error("保存に失敗しました");
    },
  });
  return mutation;
}
