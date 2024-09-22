import { UserIcon } from "@/features/common/components/ui";
import { HeaderLogo } from "./__headerLogo";
import { Navigation } from "./__navigation";

export function Header() {
  return (
    <header className="bg-gradient-to-b from-sky-600 to-sky-800 px-4 py-8 lg:px-14">
      <div className="max-w-screen-2xl mx-auto">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center lg:gap-x-16">
            <HeaderLogo />
            <Navigation />
          </div>
          <UserIcon />
        </div>
      </div>
    </header>
  );
}
