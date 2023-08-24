import { auth, provider } from "@/firebase/client";
import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

const getCookies = async (idToken: string) => {
  try {
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
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const useAuth = () => {
  const router = useRouter();

  const handleSignIn = useCallback(async () => {
    try {
      const userCred = await signInWithPopup(auth, provider);
      const user = userCred.user;
      const idToken = await user.getIdToken();
      const res = await getCookies(idToken);
      if (!res) return;
      if (res.error) return console.log(res.error);
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
    }
  }, [router]);

  const handleSignOut = useCallback(async () => {
    try {
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
      const parsed = await response.json();
      console.log(parsed);
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  }, [router]);

  return { handleSignIn, handleSignOut };
};
