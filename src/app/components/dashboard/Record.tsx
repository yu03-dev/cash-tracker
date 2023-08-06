import { RecordAction, RecordType } from "@/app/types";
import React from "react";
import { Typography } from "@material-tailwind/react";
import { useRecord } from "@/app/hooks/useRecord";
import { Amount } from "./RecordColumn/Amount";
import { Purpose } from "./RecordColumn/Purpose";
import { EditButton } from "./RecordColumn/EditButton";
import { DeleteButton } from "./RecordColumn/DeleteButton";
import { timestampConverter } from "@/app/utils/timestampConverter";

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
    editAmount,
    editPurpose,
    handleIsEditing,
    handleEditAmount,
    handleEditPurpose,
    handleEdit,
    onDelete,
  } = useRecord({ record, actions });

  return (
    <tr>
      <td className={classes}>
        <Typography variant="small" color="blue-gray" className="font-normal">
          {timestampConverter(record.timestamp)}
        </Typography>
      </td>
      <td className={classes}>
        <Amount
          isEditting={isEditting}
          amount={record.amount}
          handleEditAmount={handleEditAmount}
          editAmount={editAmount}
        />
      </td>
      <td className={classes}>
        <Purpose
          isEditting={isEditting}
          purpose={record.purpose}
          handleEditPurpose={handleEditPurpose}
          editPurpose={editPurpose}
        />
      </td>
      <td className={classes}>
        <EditButton isEditting={isEditting} handleIsEditing={handleIsEditing} />
      </td>
      <td className={classes}>
        <DeleteButton
          isEditting={isEditting}
          handleEdit={handleEdit}
          onDelete={onDelete}
        />
      </td>
    </tr>
  );
};
