import { Typography } from "@/app/common/lib/material-tailwind";
import React from "react";

export const Header = () => {
  return (
    <div className="container mx-auto px-16 py-6 w-full flex justify-between items-center">
      <Typography variant="h6" color="blue-gray" className="lg:text-lg">
        CashTracker
      </Typography>
      <Typography variant="h6" color="blue-gray" className="lg:text-lg">
        My Portfolio
      </Typography>
    </div>
  );
};
