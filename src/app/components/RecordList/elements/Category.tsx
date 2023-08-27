import { Option, Select, Typography } from "@material-tailwind/react";
import React from "react";

export const Category = ({
  isEditting,
  category,
  handleEditCategory,
  editCategory,
}: {
  isEditting: boolean;
  category: string;
  handleEditCategory: (selectedValue: string | undefined) => void;
  editCategory: string;
}) => {
  return (
    <div>
      {isEditting ? (
        <div>
          <Select
            label="Select Version"
            onChange={handleEditCategory}
            value={editCategory}
          >
            <Option value="支給">(+)支給</Option>
            <Option value="食費">(-)食費</Option>
            <Option value="交通費">(-)交通費</Option>
            <Option value="その他">(-)その他</Option>
          </Select>
        </div>
      ) : (
        <Typography
          variant="paragraph"
          color="blue-gray"
          className="font-normal w-full"
        >
          {category}
        </Typography>
      )}
    </div>
  );
};
