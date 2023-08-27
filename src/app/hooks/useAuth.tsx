import { auth, provider } from "@/firebase/client";
import { zMessageResponse } from "@/types";
import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

// api/auth/login, logoutは戻り値が複数の型を返すのでanyで受け取る

const login = async (idToken: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idToken }),
      cache: "no-store",
    }
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const { message } = zMessageResponse.parse(await response.json());
  return message;
};

const logout = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/logout`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const { message } = zMessageResponse.parse(await response.json());
  return message;
};

export const useAuth = () => {
  const router = useRouter();

  const handleSignIn = useCallback(async () => {
    try {
      const userCred = await signInWithPopup(auth, provider);
      const user = userCred.user;
      const idToken = await user.getIdToken();
      const message = await login(idToken);
      console.log(message);
      router.push("/records/index");
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error", error.message);
      } else {
        console.error(error);
      }
    }
  }, [router]);

  const handleSignOut = useCallback(async () => {
    try {
      const message = await logout();
      console.log(message);
      router.push("/");
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error", error.message);
      } else {
        console.error(error);
      }
    }
  }, [router]);

  return { handleSignIn, handleSignOut };
};
