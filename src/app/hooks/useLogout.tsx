import { useSetAtom } from "jotai";
import { useCallback, useState } from "react";
import { snackbarState } from "../store/snackbar";
import { zMessageResponse } from "@/types";

export const useLogout = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const setActiveSnackbar = useSetAtom(snackbarState);

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

  return { isLoading, logout };
};
