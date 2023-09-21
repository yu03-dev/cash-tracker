import { useSetAtom } from "jotai";
import { useEffect, useRef } from "react";
import { snackbarState } from "../store/snackbar";

type UseMutateSnackbarProps = {
  loadingText: string;
  completeText: string;
  loading: boolean;
};
export const useMutateSnackbar = ({
  loadingText,
  completeText,
  loading = false,
}: UseMutateSnackbarProps) => {
  const setActiveSnackbar = useSetAtom(snackbarState);
  const prevIsLoadingRef = useRef<boolean>(false);

  useEffect(() => {
    setActiveSnackbar({
      isOpen: loading,
      message: loadingText,
      loading,
      isError: false,
    });

    if (prevIsLoadingRef.current != loading && !loading) {
      setActiveSnackbar({
        isOpen: true,
        message: completeText,
        loading,
        isError: false,
      });
    }

    prevIsLoadingRef.current = loading;
  }, [loading, setActiveSnackbar, loadingText, completeText]);
};
