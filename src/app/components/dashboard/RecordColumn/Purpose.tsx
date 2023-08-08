import { Typography } from "@material-tailwind/react";
import React, { ChangeEvent } from "react";

export const Purpose = ({
  isEditting,
  purpose,
  handleEditPurpose,
  editPurpose,
}: {
  isEditting: boolean;
  purpose: string;
  handleEditPurpose: (e: ChangeEvent<HTMLInputElement>) => void;
  editPurpose: string;
}) => {
  return (
    <div>
      {isEditting ? (
        <input
          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          type="text"
          onChange={handleEditPurpose}
          value={editPurpose}
        />
      ) : (
        <Typography variant="small" color="blue-gray" className="font-normal">
          {purpose}
        </Typography>
      )}
    </div>
  );
};
