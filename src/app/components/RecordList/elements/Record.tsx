"use client";
import { RecordType } from "@/types";
import { Typography } from "@/app/components/material-tailwind-wrapper";
import { useRecord } from "@/app/hooks/records/useRecord";
import { Price } from "./Price";
import { Category } from "./Category";
import { secondsTypeConverter } from "@/utils/secondsTypeConverter";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { isNotExpense } from "@/utils/const";

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
        <Typography variant="small" color="blue-gray" className="font-normal">
          {secondsTypeConverter(record.createdAt)}
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
        <div className="flex justify-end">
          {isEditting ? (
            <CloseIcon onClick={handleIsEditing} />
          ) : (
            <EditIcon onClick={handleIsEditing} />
          )}
        </div>
      </td>
      <td className={classes}>
        <div className="flex justify-start">
          {isEditting ? (
            <CheckIcon
              onClick={() =>
                handleUpdate({ price: editPrice, category: editCategory })
              }
            />
          ) : (
            <DeleteForeverIcon onClick={handleDelete} />
          )}
        </div>
      </td>
    </tr>
  );
};
