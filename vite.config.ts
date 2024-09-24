import path from "node:path";
import adapter from "@hono/vite-dev-server/cloudflare";
import {
  vitePlugin as remix,
  cloudflareDevProxyVitePlugin as remixCloudflareDevProxy,
} from "@remix-run/dev";
import serverAdapter from "hono-remix-adapter/vite";
import { flatRoutes } from "remix-flat-routes";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => ({
  /**
   * workerdランタイムでpostgres.jsパッケージを使用するとエラーになるためエントリポイントを変更する
   * @see https://github.com/remix-run/remix/issues/9245#issuecomment-2179517678
   */
  resolve: {
    alias: {
      ...(mode === "development" && {
        postgres: path.resolve(__dirname, "node_modules/postgres/src/index.js"),
      }),
    },
  },
  plugins: [
    remixCloudflareDevProxy(),
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
            "**/__*/*",
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
    serverAdapter({
      adapter,
      entry: "app/server/server.ts",
    }),
    tsconfigPaths(),
  ],
}));
