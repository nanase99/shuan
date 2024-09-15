import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  json,
  useLoaderData,
} from "@remix-run/react";
import "ress";
import { ClerkApp } from "@clerk/remix";
import { rootAuthLoader } from "@clerk/remix/ssr.server";
import type { LoaderFunctionArgs } from "@remix-run/cloudflare";

import "./globals.css";
import { QueryProvider } from "./features/common/components/providers";

export const loader = (args: LoaderFunctionArgs) =>
  rootAuthLoader(args, () => {
    return json({
      ENV: {
        APP_URL: process.env.APP_URL,
      },
    });
  });

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

function App() {
  const data = useLoaderData<typeof loader>();

  return (
    <>
      <QueryProvider>
        <Outlet />
      </QueryProvider>
      <script
        // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
        dangerouslySetInnerHTML={{
          __html: `window.ENV = ${JSON.stringify(data.ENV)}`,
        }}
      />
    </>
  );
}

export default ClerkApp(App);
