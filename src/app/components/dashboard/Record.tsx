import { RecordAction, RecordType } from "@/app/types";
import { Typography } from "@material-tailwind/react";
import { useRecord } from "@/app/hooks/useRecord";
import { Price } from "./RecordColumn/Price";
import { Category } from "./RecordColumn/Category";
import { EditButton } from "./RecordColumn/EditButton";
import { DeleteButton } from "./RecordColumn/DeleteButton";
import { secondsTypeConverter } from "@/app/utils/secondsTypeConverter";

export const Record = ({
  record,
  actions,
  classes,
}: {
  record: RecordType;
  actions: RecordAction;
  classes: string;
}) => {
  const {
    isEditting,
    editPrice,
    editCategory,
    handleIsEditing,
    handleEditPrice,
    handleEditCategory,
    onUpdate,
    onDelete,
  } = useRecord({ record, actions });

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
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      </td>
    </tr>
  );
};
