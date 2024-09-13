import { getContext } from "hono/context-storage";

import type { ServerEnv } from "@/server/serverUtil";

const context = getContext<ServerEnv>();

export const diContainer = {
  getSubjectUseCase: () => context.var.getSubjectUseCase,
};
