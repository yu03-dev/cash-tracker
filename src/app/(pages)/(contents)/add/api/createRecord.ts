import { snackbarState } from "@/app/store/snackbar";
import { PostDataType, zMessageResponse } from "@/types";
import { useSetAtom } from "jotai";
import { useCallback, useState } from "react";

export const useCreateRecord = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const setActiveSnackbar = useSetAtom(snackbarState);

  const createRecord = useCallback(
    async ({ price, category }: PostDataType) => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/records`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ price, category }),
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
          message: "データの追加に失敗しました",
          loading: false,
          isError: true,
        });
        if (error instanceof Error) {
          console.error("Error", error.message);
        } else {
          console.error(error);
        }
      }
      setIsLoading(false);
    },
    [setActiveSnackbar]
  );

  return { isLoading, createRecord };
};
