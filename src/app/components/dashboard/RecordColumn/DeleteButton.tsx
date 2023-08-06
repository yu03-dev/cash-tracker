import { Button } from "@material-tailwind/react";
import React from "react";

export const DeleteButton = ({
  isEditting,
  handleEdit,
  onDelete,
}: {
  isEditting: boolean;
  handleEdit: () => void;
  onDelete: () => void;
}) => {
  return (
    <div>
      {isEditting ? (
        <Button onClick={handleEdit}>Save</Button>
      ) : (
        <Button onClick={onDelete}>Delete</Button>
      )}
    </div>
  );
};
