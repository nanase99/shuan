import { vitePlugin as remix } from "@remix-run/dev";
import { flatRoutes } from "remix-flat-routes";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    remix({
      ignoredRouteFiles: ["**/*"],
      routes: async (defineRoutes) =>
        flatRoutes("routes", defineRoutes, {
          // NOTE: コロケーションファイルまでrouteに含めないようにする
          /**
           * @see https://github.com/epicweb-dev/epic-stack/blob/bb627cecfdb466c14e1c62bb19054ce50d5eab68/vite.config.ts#L42
           */
          ignoredRouteFiles: [
            ".*",
            "**/*.css",
            "**/*.test.{js,jsx,ts,tsx}",
            "**/__*.*",
            "**/*.server.*",
            "**/*.client.*",
          ],
        }),
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
    }),
    tsconfigPaths(),
  ],
});
