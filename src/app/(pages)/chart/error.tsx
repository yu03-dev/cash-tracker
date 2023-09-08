"use client";

import { BoxError } from "@/app/common/BoxError";
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

  return <BoxError message={error.message} reset={reset} />;
}
