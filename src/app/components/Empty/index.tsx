import { Card, Typography } from "@/app/lib/material-tailwind";
import { InboxStackIcon } from "@heroicons/react/24/solid";
import React from "react";

export const Empty = () => {
  return (
    <Card shadow={false} className="bg-transparent w-full">
      <div className="flex flex-col justify-center items-center">
        <InboxStackIcon className="h-16 w-16" />
        <Typography color="blue-gray" variant="h3">
          まだデータがありません
        </Typography>
      </div>
    </Card>
  );
};
