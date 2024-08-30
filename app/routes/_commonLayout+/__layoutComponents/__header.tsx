import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/remix";
import { Loader2 } from "lucide-react";
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
          <ClerkLoaded>
            <UserButton />
          </ClerkLoaded>
          <ClerkLoading>
            <Loader2 className="size-8 animate-spin text-slate-400" />
          </ClerkLoading>
        </div>
      </div>
    </header>
  );
}
