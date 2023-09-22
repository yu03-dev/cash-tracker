import { atom } from "jotai";

type SnackbarStateProps = {
  isOpen: boolean;
  loading: boolean;
  message: string;
  isError: boolean;
};

export const snackbarState = atom<SnackbarStateProps>({
  isOpen: false,
  loading: false,
  message: "",
  isError: false,
});
