"use client";
import { Alert, Spinner, Typography } from "@/app/common/lib/material-tailwind";
import { snackbarState } from "@/app/store/snackbar";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/solid";
import { useAtom } from "jotai";
import React, { useEffect } from "react";

const initialSnackbarState = {
  isOpen: false,
  loading: false,
  message: "",
  isError: false,
};

export const Snackbar = () => {
  const [activeSnackbar, setActiveSnackbar] = useAtom(snackbarState);

  useEffect(() => {
    if (activeSnackbar.isOpen) {
      const timer = setTimeout(() => {
        setActiveSnackbar(initialSnackbarState);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [activeSnackbar.isOpen, activeSnackbar.loading, setActiveSnackbar]);

  return (
    <>
      <Alert
        open={activeSnackbar.isOpen}
        onClose={() => setActiveSnackbar(initialSnackbarState)}
        color="gray"
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-10 w-80 md:w-96"
      >
        <div className="w-full flex justify-between gap-8">
          {activeSnackbar.isError ? (
            <ExclamationTriangleIcon className="h-6 w-6" />
          ) : activeSnackbar.loading ? (
            <Spinner className="h-6 w-6" />
          ) : (
            <CheckCircleIcon className="h-6 w-6 text-green-200" />
          )}
          <Typography>{activeSnackbar.message}</Typography>
        </div>
      </Alert>
    </>
  );
};
