"use client";

import { SignInButton } from "@/components/SignInButton";
import { SignOutButton } from "@/components/SignOutButton";

export default function Page() {
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
