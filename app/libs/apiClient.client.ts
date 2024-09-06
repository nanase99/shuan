import { hc } from "hono/client";

import type { AppType } from "@/server";

export const apiClient = hc<AppType>(window.ENV.APP_URL!);
