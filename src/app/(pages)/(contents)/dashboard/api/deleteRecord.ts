import { snackbarState } from "@/app/store/snackbar";
import { zMessageResponse } from "@/types";
import { useSetAtom } from "jotai";
import { useCallback, useState } from "react";

export const useDeleteRecord = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const setActiveSnackbar = useSetAtom(snackbarState);

  const deleteRecord = useCallback(
    async (params: { recordId: string }) => {
      const { recordId } = params;
      setIsLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/records/${recordId}`,
          {
            method: "DELETE",
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
          message: "データの削除に失敗しました",
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

  return { isLoading, deleteRecord };
};
