import { getApiClient } from "@/features/common/libs";
import { useMutation } from "@tanstack/react-query";
import type { InferRequestType, InferResponseType } from "hono";

const client = getApiClient();
type ResponseType = InferResponseType<(typeof client.api.subjects)["$post"]>;
type RequestType = InferRequestType<
  (typeof client.api.subjects)["$post"]
>["json"];

export function fetchSaveSubject() {
  const useSaveSubject = () => {
    const mutation = useMutation<ResponseType, Error, RequestType>({
      mutationFn: async (json) => {
        const response = await client.api.subjects.$post({ json });
        return await response.json();
      },
    });
    return mutation;
  };

  return { useSaveSubject };
}
