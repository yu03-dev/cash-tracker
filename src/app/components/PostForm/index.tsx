"use client";
import { usePostForm } from "@/app/hooks/form/usePostForm";
import { Button, Select, Option } from "@material-tailwind/react";

export const PostForm = () => {
  const { price, category, handlePrice, handleCategory, handleAdd } =
    usePostForm();

  return (
    <form className="w-full max-w-sm">
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label
            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            htmlFor="price"
          >
            Price
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            type="number"
            id="price"
            value={price == 0 ? "" : price}
            onChange={handlePrice}
          />
        </div>
      </div>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label
            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            htmlFor="category"
          >
            Category
          </label>
        </div>
        <div className="md:w-2/3">
          <Select
            label="Select Category"
            onChange={handleCategory}
            value={category}
          >
            <Option value="支給">(+)支給</Option>
            <Option value="食費">(-)食費</Option>
            <Option value="交通費">(-)交通費</Option>
            <Option value="その他">(-)その他</Option>
          </Select>
        </div>
      </div>
      <div className="md:flex md:items-center">
        <div className="md:w-1/3"></div>
        <div className="md:w-2/3">
          <Button onClick={() => handleAdd({ price, category })}>ADD</Button>
        </div>
      </div>
    </form>
  );
};
