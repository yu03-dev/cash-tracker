import React from "react";

type FormProps = {
  onSubmit: () => void;
  children: React.ReactNode;
};

export const FormContainer = (props: FormProps) => {
  const { onSubmit, children } = props;
  return (
    <form onSubmit={onSubmit} className="mt-8 w-full flex flex-col gap-6">
      {children}
    </form>
  );
};
