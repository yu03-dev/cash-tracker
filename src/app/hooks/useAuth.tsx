import { zMessageResponse } from "@/types";
import { useSetAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { snackbarState } from "../store/snackbar";

export const useAuth = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const setActiveSnackbar = useSetAtom(snackbarState);

  const login = useCallback(
    async (idToken: string) => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ idToken }),
          }
        );
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const { message } = zMessageResponse.parse(await response.json());
        console.log(message);
      } catch (error) {
        setActiveSnackbar({
          isOpen: true,
          message: "ログインに失敗しました",
          loading: false,
          isError: true,
        });
        if (error instanceof Error) {
          console.error(error.message);
        } else {
          console.error(error);
        }
      }
      setIsLoading(false);
    },
    [setActiveSnackbar]
  );

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/logout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const { message } = zMessageResponse.parse(await response.json());
      console.log(message);
    } catch (error) {
      setActiveSnackbar({
        isOpen: true,
        message: "ログアウトに失敗しました",
        loading: false,
        isError: true,
      });
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error(error);
      }
    }

    setIsLoading(false);
  }, [setActiveSnackbar]);

  return { isLoading, login, logout };
};
