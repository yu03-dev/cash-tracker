import React from "react";

export const FormInput = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex flex-col w-full gap-1">{children}</div>;
};
