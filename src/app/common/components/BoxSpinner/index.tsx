import { Spinner } from "@/app/common/lib/material-tailwind";

import React from "react";

export const BoxSpinner = () => {
  return (
    <div className="w-full h-full flex justify-center items-center mt-20">
      <Spinner className="h-10 w-10 md:h-16 md:w-16" />
    </div>
  );
};
