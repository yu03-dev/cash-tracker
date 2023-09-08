"use client";
import { RecordType } from "@/types";
import { Typography } from "@/app/common/lib/material-tailwind";
import { useRecord } from "@/app/hooks/records/useRecord";
import { Price } from "./Price";
import { Category } from "./Category";
import { secondsTypeConverter } from "@/utils/time_converter";
import CheckIcon from "@mui/icons-material/Check";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { isNotExpense } from "@/utils/expense";
import {
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@/app/common/lib/material-tailwind";

export const Record = ({
  record,
  classes,
}: {
  record: RecordType;
  classes: string;
}) => {
  const {
    isEditting,
    editPrice,
    editCategory,
    handleIsEditing,
    handleEditPrice,
    handleEditCategory,
    handleUpdate,
    handleDelete,
  } = useRecord(record);

  return (
    <tr>
      <td className={classes}>
        <Typography
          variant="paragraph"
          color="blue-gray"
          className="font-normal md:hidden"
        >
          {secondsTypeConverter(record.createdAt, 1)}
        </Typography>
        <Typography
          variant="paragraph"
          color="blue-gray"
          className="font-normal hidden md:block"
        >
          {secondsTypeConverter(record.createdAt, 0)}
        </Typography>
      </td>
      <td className={classes}>
        <Price
          isEditting={isEditting}
          price={record.price}
          handleEditPrice={handleEditPrice}
          editPrice={editPrice}
          isNotExpense={isNotExpense(record.category)}
        />
      </td>
      <td className={classes}>
        <Category
          isEditting={isEditting}
          category={record.category}
          handleEditCategory={handleEditCategory}
          editCategory={editCategory}
        />
      </td>
      <td className={classes}>
        {isEditting ? (
          <div className="text-right">
            <CheckIcon
              onClick={() =>
                handleUpdate({ price: editPrice, category: editCategory })
              }
            />
          </div>
        ) : (
          <div className="text-right">
            <Popover placement="bottom-end">
              <PopoverHandler>
                <MoreVertIcon />
              </PopoverHandler>
              <PopoverContent className="flex flex-col">
                <div onClick={handleIsEditing}>編集</div>
                <div onClick={handleDelete}>削除</div>
              </PopoverContent>
            </Popover>
          </div>
        )}
      </td>
    </tr>
  );
};
