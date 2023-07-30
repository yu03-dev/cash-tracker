"use client";
import { User } from "firebase/auth";
import { createContext, useContext } from "react";

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

// UserProviderコンポーネント用
export const UserContext = createContext<UserContext>(initialContext);

// hooksとしてあらゆるコンポーネントから使用
export const useUserContext = () => {
  return useContext(UserContext);
};
