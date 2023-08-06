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
        <input type="text" onChange={handleEditPurpose} value={editPurpose} />
      ) : (
        <Typography variant="small" color="blue-gray" className="font-normal">
          {purpose}
        </Typography>
      )}
    </div>
  );
};
