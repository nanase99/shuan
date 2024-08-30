import { ClerkLoaded, SignUp as ClerkSignUp } from "@clerk/remix";

export default function SignUp() {
  return (
    <ClerkLoaded>
      <ClerkSignUp />
    </ClerkLoaded>
  );
}
