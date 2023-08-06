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
        <input type="text" onChange={handleEditAmount} value={editAmount} />
      ) : (
        <Typography variant="small" color="blue-gray" className="font-normal">
          {amount + " 円"}
        </Typography>
      )}
    </div>
  );
};
