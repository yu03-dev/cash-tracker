import { zMessageResponse } from "@/types";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export const useAuth = () => {
  const router = useRouter();

  const login = useCallback(
    async (idToken: string) => {
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
      console.log(message);
      router.push("/records");
    },
    [router]
  );

  const logout = useCallback(async () => {
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
    console.log(message);
    router.push("/");
  }, [router]);

  return { login, logout };
};
