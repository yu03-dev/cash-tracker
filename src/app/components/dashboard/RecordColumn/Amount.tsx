import { Typography } from "@material-tailwind/react";
import React, { ChangeEvent } from "react";

export const Amount = ({
  isEditting,
  amount,
  handleEditAmount,
  editAmount,
}: {
  isEditting: boolean;
  amount: number;
  handleEditAmount: (e: ChangeEvent<HTMLInputElement>) => void;
  editAmount: number;
}) => {
  return (
    <div>
      {isEditting ? (
        <input
          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          type="text"
          onChange={handleEditAmount}
          value={editAmount}
        />
      ) : (
        <Typography variant="small" color="blue-gray" className="font-normal">
          {amount + " 円"}
        </Typography>
      )}
    </div>
  );
};
