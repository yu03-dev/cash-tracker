import { Typography } from "@/app/lib/material-tailwind";
import React from "react";
import { FieldError } from "react-hook-form";

type InputWrapperProps = {
  error: FieldError | undefined;
  children: React.ReactNode;
};

export const InputWrapper = (props: InputWrapperProps) => {
  const { error, children } = props;
  return (
    <div className="flex flex-col w-full gap-1">
      {children}
      {error?.message && (
        <Typography variant="paragraph" color="red">
          {error.message}
        </Typography>
      )}
    </div>
  );
};
