import { Outlet } from "@remix-run/react";
import { Header } from "./__components";

export default function Layout() {
  // TODO: ヘッダーを作成する
  // TODO: サイドバーを作成する
  return (
    <>
      <Header />
      <main>
        <div className="p-4">
          <Outlet />
        </div>
      </main>
    </>
  );
}
