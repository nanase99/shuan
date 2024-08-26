import { HeaderLogo } from "./HeaderLogo";
import { Navigation } from "./Navigation";

export function Header() {
  return (
    <header className="bg-gradient-to-b from-blue-700 to-blue-500 px-4 py-8 lg:px-14">
      <div className="max-w-screen-2xl mx-auto">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center lg:gap-x-16">
            <HeaderLogo />
            <Navigation />
          </div>
        </div>
        <div className="mt-14">Hello</div>
      </div>
    </header>
  );
}
