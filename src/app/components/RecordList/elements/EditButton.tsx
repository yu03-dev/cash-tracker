import { Button } from "@material-tailwind/react";
import React from "react";

export const EditButton = ({
  isEditting,
  handleIsEditing,
}: {
  isEditting: boolean;
  handleIsEditing: () => void;
}) => {
  return (
    <div>
      {isEditting ? (
        <Button onClick={handleIsEditing}>Cancel</Button>
      ) : (
        <Button onClick={handleIsEditing}>Edit</Button>
      )}
    </div>
  );
};
