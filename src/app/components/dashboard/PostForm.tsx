"use client";
import { usePostForm } from "@/app/hooks/usePostForm";
import { PostType } from "@/app/types";
import { Button } from "@material-tailwind/react";
import React from "react";

export const PostForm = ({
  handleAdd,
}: {
  handleAdd: ({ amount, purpose }: PostType) => void;
}) => {
  const { amount, purpose, handleAmount, handlePurpose, initializeState } =
    usePostForm();

  const handleClick = () => {
    handleAdd({ amount, purpose });
    initializeState();
  };

  return (
    <form className="w-full max-w-sm">
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label
            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            htmlFor="amount"
          >
            金額
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            type="text"
            id="amount"
            value={amount}
            onChange={handleAmount}
          />
        </div>
      </div>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label
            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            htmlFor="purpose"
          >
            用途
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            type="text"
            id="purpose"
            value={purpose}
            onChange={handlePurpose}
          />
        </div>
      </div>
      <div className="md:flex md:items-center">
        <div className="md:w-1/3"></div>
        <div className="md:w-2/3">
          <Button onClick={handleClick}>ADD</Button>
        </div>
      </div>
    </form>
  );
};
