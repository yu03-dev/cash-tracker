"use client";

import { SignInButton } from "@/components/SignInButton";
import { SignOutButton } from "@/components/SignOutButton";
import { useCheckAuth } from "@/hooks/useCheckAuth";

export default function Page() {
  useCheckAuth();
  return (
    <div>
      <h1>サインイン・サインアウト</h1>
      <div>
        <SignInButton />
        <SignOutButton />
      </div>
    </div>
  );
}
