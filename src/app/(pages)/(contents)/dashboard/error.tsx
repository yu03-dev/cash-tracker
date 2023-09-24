"use client";

import { ErrorPage } from "@/app/components/ErrorPage";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <ErrorPage message={error.message} reset={reset} />;
}
