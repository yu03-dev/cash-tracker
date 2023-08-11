import { Button } from "@material-tailwind/react";
import React from "react";

export const DeleteButton = ({
  isEditting,
  onUpdate,
  onDelete,
}: {
  isEditting: boolean;
  onUpdate: () => void;
  onDelete: () => void;
}) => {
  return (
    <div>
      {isEditting ? (
        <Button onClick={onUpdate}>Save</Button>
      ) : (
        <Button onClick={onDelete}>Delete</Button>
      )}
    </div>
  );
};
