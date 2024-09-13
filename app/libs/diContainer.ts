import { getContext } from "hono/context-storage";

import type { ServerEnv } from "@/types/common";

const context = getContext<ServerEnv>();

export const diContainer = {
  getSubjectUseCase: () => context.var.getSubjectUseCase,
};
