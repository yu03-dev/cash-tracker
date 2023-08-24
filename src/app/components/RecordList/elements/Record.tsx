"use client";
import { RecordType } from "@/types";
import { Typography } from "@material-tailwind/react";
import { useRecord } from "@/app/hooks/records/useRecord";
import { Price } from "./Price";
import { Category } from "./Category";
import { EditButton } from "./EditButton";
import { DeleteButton } from "./DeleteButton";
import { secondsTypeConverter } from "@/utils/secondsTypeConverter";

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
        <EditButton isEditting={isEditting} handleIsEditing={handleIsEditing} />
      </td>
      <td className={classes}>
        <DeleteButton
          isEditting={isEditting}
          handleUpdate={() =>
            handleUpdate({ price: editPrice, category: editCategory })
          }
          handleDelete={handleDelete}
        />
      </td>
    </tr>
  );
};
