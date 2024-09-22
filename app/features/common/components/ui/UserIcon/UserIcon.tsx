import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/remix";
import { Loader2 } from "lucide-react";

export function UserIcon() {
  return (
    <>
      <ClerkLoaded>
        <UserButton />
      </ClerkLoaded>
      <ClerkLoading>
        <Loader2 className="size-8 animate-spin text-slate-400" />
      </ClerkLoading>
    </>
  );
}
