"use client";
import { auth } from "@/firebase/config";
import { User } from "firebase/auth";
import { createContext, useContext, ReactNode } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export type UserContext = {
  user: User | null | undefined;
  isloading: boolean;
  error: Error | undefined;
};

const initialContext = {
  user: undefined,
  isloading: false,
  error: undefined,
};
const UserContext = createContext<UserContext>(initialContext);

// hooksとして使う(このファイルに定義するのは気持ち悪いが...)
export const useUserContext = () => {
  return useContext(UserContext);
};

export default function UserProvider({ children }: { children: ReactNode }) {
  const [user, isloading, error] = useAuthState(auth);
  const value = {
    user,
    isloading,
    error,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
