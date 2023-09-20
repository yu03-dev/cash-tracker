"use client";
import { Alert, Spinner, Typography } from "@/app/common/lib/material-tailwind";
import { snackbarState } from "@/app/store/snackbar";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { useAtom } from "jotai";
import React, { useEffect } from "react";

export const Snackbar = () => {
  const [activeSnackbar, setActiveSnackbar] = useAtom(snackbarState);

  useEffect(() => {
    if (activeSnackbar.isOpen) {
      const timer = setTimeout(() => {
        setActiveSnackbar({
          isOpen: false,
          loading: false,
          message: "",
          isError: false,
        });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [activeSnackbar.isOpen, activeSnackbar.loading, setActiveSnackbar]);

  return (
    <>
      {activeSnackbar.isOpen && (
        <Alert
          color="gray"
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-10 w-96"
        >
          <div className="w-full flex justify-between gap-8">
            {!activeSnackbar.isError &&
              (activeSnackbar.loading ? (
                <Spinner className="h-6 w-6" />
              ) : (
                <CheckCircleIcon className="h-6 w-6 text-green-200" />
              ))}
            <Typography>{activeSnackbar.message}</Typography>
          </div>
        </Alert>
      )}
    </>
  );
};
