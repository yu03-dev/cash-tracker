import React from "react";
import { Button, Card, Typography } from "@/app/lib/material-tailwind";

type ErrorProps = {
  message: string;
  reset: () => void;
};

export const ErrorPage = (props: ErrorProps) => {
  const { message, reset } = props;
  return (
    <div className="container mx-auto px-8 py-8">
      <Card className="w-full flex flex-col gap-y-5 px-6 py-6">
        <Typography variant="h2" color="blue-gray" className="text-4xl">
          Error
        </Typography>
        <Typography variant="h5" color="red" className="text-xl">
          {message}
        </Typography>
        <Button onChange={() => reset()} className="w-fit">
          Try again
        </Button>
      </Card>
    </div>
  );
};
