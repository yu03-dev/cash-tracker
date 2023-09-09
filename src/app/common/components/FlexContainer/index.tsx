import React from "react";

export const FlexContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-full flex flex-col gap-y-6 items-center px-1 py-8 sm:px-4 md:px-8 md:py-12 lg:px-12">
      {children}
    </div>
  );
};
