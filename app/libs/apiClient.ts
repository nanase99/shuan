import { hc } from "hono/client";

import type { AppType } from "@/server/server";

export const apiClient = hc<AppType>(getAppUrl());

function getAppUrl() {
  try {
    return window.ENV.APP_URL!;
  } catch {
    return process.env.APP_URL!;
  }
}
