import { ClerkLoaded, SignIn as ClerkSignIn } from "@clerk/remix";

export default function SignIn() {
  return (
    <ClerkLoaded>
      <ClerkSignIn />
    </ClerkLoaded>
  );
}
