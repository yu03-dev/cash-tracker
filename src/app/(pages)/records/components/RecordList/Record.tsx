"use client";
import { RecordType } from "@/types";
import { Typography } from "@/app/common/lib/material-tailwind";
import { TimeConverter } from "@/utils/time_converter";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { isNotExpense } from "@/utils/expense";
import {
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@/app/common/lib/material-tailwind";
import React, { useState } from "react";
import { UpdateFormDialog } from "./UpdateFormDialog";
import { DeleteDialog } from "./DeleteDialog";

const MoreVertPopdown = ({ children }: { children: React.ReactNode }) => {
  return (
    <Popover placement="bottom-end">
      <PopoverHandler>
        <MoreVertIcon />
      </PopoverHandler>
      <PopoverContent className="w-20 flex flex-col items-center">
        {children}
      </PopoverContent>
    </Popover>
  );
};

export const Record = ({
  record,
  classes,
}: {
  record: RecordType;
  classes: string;
}) => {
  const [isOpenUpdateDialog, setIsOpenUpdateDialog] = useState<boolean>(false);
  const handleOpenUpdateDialog = () => setIsOpenUpdateDialog((prev) => !prev);
  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState<boolean>(false);
  const handleOpenDeleteDialog = () => setIsOpenDeleteDialog((prev) => !prev);
  const { id, price, category, createdAt } = record;
  const isIncome = isNotExpense(category);
  const data = {
    recordId: id,
    currentPrice: price,
    currentCategory: category,
  };

  return (
    <>
      <tr>
        <td className={classes}>
          <Typography
            variant="paragraph"
            color="blue-gray"
            className="font-normal"
          >
            <span className="md:hidden">{TimeConverter(createdAt, "day")}</span>
            <span className="hidden md:block">
              {TimeConverter(createdAt, "seconds")}
            </span>
          </Typography>
        </td>
        <td className={classes}>
          <Typography
            variant="paragraph"
            color={isIncome ? "green" : "blue-gray"}
            className="font-normal w-full"
          >
            {isIncome ? `+${price} 円` : `${price} 円`}
          </Typography>
        </td>
        <td className={classes}>
          <Typography
            variant="paragraph"
            color="blue-gray"
            className="font-normal w-full"
          >
            {category}
          </Typography>
        </td>
        <td className={classes}>
          <div className="text-right">
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
        data={data}
      />
      <DeleteDialog
        isOpen={isOpenDeleteDialog}
        handleOpen={handleOpenDeleteDialog}
        recordId={id}
      />
    </>
  );
};
