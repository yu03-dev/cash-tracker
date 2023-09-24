"use client";
import { RecordType } from "@/types";
import { Typography } from "@/lib/material-tailwind";
import { TimeConverter } from "@/utils/time_converter";
import { isNotExpense } from "@/utils/expense";
import {
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@/lib/material-tailwind";
import React, { useEffect, useState } from "react";
import { UpdateFormDialog } from "./UpdateFormDialog";
import { DeleteDialog } from "./DeleteDialog";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";

const MoreVertPopdown = ({ children }: { children: React.ReactNode }) => {
  return (
    <Popover placement="bottom-end">
      <PopoverHandler>
        <EllipsisVerticalIcon className="h-6 w-6 cursor-pointer" />
      </PopoverHandler>
      <PopoverContent className="w-20 flex flex-col items-center">
        {children}
      </PopoverContent>
    </Popover>
  );
};

export const RecordRow = ({
  record,
  classes,
}: {
  record: RecordType;
  classes: string;
}) => {
  const { id, price, category, createdAt } = record;
  const [isOpenUpdateDialog, setIsOpenUpdateDialog] = useState<boolean>(false);
  const handleOpenUpdateDialog = () => setIsOpenUpdateDialog((prev) => !prev);
  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState<boolean>(false);
  const handleOpenDeleteDialog = () => setIsOpenDeleteDialog((prev) => !prev);

  const isIncome = isNotExpense(category);
  const onlyDate = TimeConverter(createdAt, "day");
  const timestamp = TimeConverter(createdAt, "seconds");

  return (
    <>
      <tr>
        <td className={classes}>
          <Typography variant="small" color="blue-gray" className="font-normal">
            <span className="md:hidden">{onlyDate || ""}</span>
            <span className="hidden md:block">{timestamp || ""}</span>
          </Typography>
        </td>
        <td className={classes}>
          <Typography
            variant="small"
            color={isIncome ? "green" : "blue-gray"}
            className="font-normal w-full"
          >
            {isIncome ? `+${price} 円` : `${price} 円`}
          </Typography>
        </td>
        <td className={classes}>
          <Typography
            variant="small"
            color="blue-gray"
            className="font-normal w-full"
          >
            {category}
          </Typography>
        </td>
        <td className={classes}>
          <div className="flex justify-end">
            <MoreVertPopdown>
              <Typography
                onClick={handleOpenUpdateDialog}
                className=" text-blue-gray-900 hover:text-blue-gray-600 hover:cursor-pointer"
              >
                編集
              </Typography>
              <Typography
                onClick={handleOpenDeleteDialog}
                className=" text-red-800 hover:text-red-500 hover:cursor-pointer"
              >
                削除
              </Typography>
            </MoreVertPopdown>
          </div>
        </td>
      </tr>
      <UpdateFormDialog
        isOpen={isOpenUpdateDialog}
        handleOpen={handleOpenUpdateDialog}
        data={{
          recordId: id,
          currentPrice: price,
          currentCategory: category,
        }}
      />
      <DeleteDialog
        isOpen={isOpenDeleteDialog}
        handleOpen={handleOpenDeleteDialog}
        recordId={id}
      />
    </>
  );
};
