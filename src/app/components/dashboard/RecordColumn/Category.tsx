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
        <div className="w-72">
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
        <Typography variant="small" color="blue-gray" className="font-normal">
          {category}
        </Typography>
      )}
    </div>
  );
};
