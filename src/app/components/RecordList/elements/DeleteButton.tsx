import { Button } from "@material-tailwind/react";
import React from "react";

export const DeleteButton = ({
  isEditting,
  handleUpdate,
  handleDelete,
}: {
  isEditting: boolean;
  handleUpdate: () => void;
  handleDelete: () => void;
}) => {
  return (
    <div>
      {isEditting ? (
        <Button onClick={handleUpdate}>Save</Button>
      ) : (
        <Button onClick={handleDelete}>Delete</Button>
      )}
    </div>
  );
};
