import { Outlet } from "@remix-run/react";
import { Header } from "./__layoutComponents";

export default function Layout() {
  // TODO: ヘッダーを作成する
  // TODO: サイドバーを作成する
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}
