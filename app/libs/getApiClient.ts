import { hc } from "hono/client";

import type { AppType } from "@/server/server";

export const getApiClient = () => hc<AppType>("/");
