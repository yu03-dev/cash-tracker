"use client";
import { auth } from "@/app/firebase/client";
import { ReactNode } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { UserContext } from "@/app/hooks/context";

export default function UserProvider({ children }: { children: ReactNode }) {
  const [user, isloading, error] = useAuthState(auth);
  const value = {
    user,
    isloading,
    error,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
