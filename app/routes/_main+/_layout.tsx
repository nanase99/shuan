import { Outlet } from "@remix-run/react";

export default function Layout() {
  // TODO: ヘッダーを作成する
  // TODO: サイドバーを作成する
  return (
    <>
      <main>
        <Outlet />
      </main>
    </>
  );
}
