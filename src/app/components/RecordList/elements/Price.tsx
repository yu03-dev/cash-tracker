import { Typography } from "@/app/common/lib/material-tailwind";
import React, { ChangeEvent } from "react";

export const Price = ({
  isEditting,
  price,
  handleEditPrice,
  editPrice,
  isNotExpense,
}: {
  isEditting: boolean;
  price: number;
  handleEditPrice: (e: ChangeEvent<HTMLInputElement>) => void;
  editPrice: number;
  isNotExpense: boolean;
}) => {
  return (
    <div>
      {isEditting ? (
        <input
          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          type="number"
          onChange={handleEditPrice}
          value={editPrice == 0 ? "" : editPrice}
        />
      ) : isNotExpense ? (
        <Typography
          variant="paragraph"
          color="green"
          className="font-normal w-full"
        >
          {`+${price} 円`}
        </Typography>
      ) : (
        <Typography
          variant="paragraph"
          color="blue-gray"
          className="font-normal w-full"
        >
          {`${price} 円`}
        </Typography>
      )}
    </div>
  );
};
