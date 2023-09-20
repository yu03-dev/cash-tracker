import { useSetAtom } from "jotai";
import { useEffect, useRef } from "react";
import { snackbarState } from "../store/ui/snackbar";

type UseMutateSnackbarProps = {
  actionText: string;
  loading: boolean;
};
export const useMutateSnackbar = ({
  actionText = "追加",
  loading = false,
}: UseMutateSnackbarProps) => {
  const setActiveSnackbar = useSetAtom(snackbarState);
  const prevIsLoadingRef = useRef<boolean>(false);

  useEffect(() => {
    setActiveSnackbar({
      isOpen: loading,
      message: `データを${actionText}しています`,
      loading,
      isError: false,
    });

    if (prevIsLoadingRef.current != loading && !loading) {
      setActiveSnackbar({
        isOpen: true,
        message: `データの${actionText}が完了しました`,
        loading,
        isError: false,
      });
    }

    prevIsLoadingRef.current = loading;
  }, [loading, setActiveSnackbar, actionText]);
};
