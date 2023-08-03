import { RecordAction, RecordType } from "@/app/types";
import React, { ChangeEvent, useCallback, useState } from "react";
import { Button } from "@material-tailwind/react";
import { useRecord } from "@/app/hooks/useRecord";

export const Record = ({
  record,
  actions,
}: {
  record: RecordType;
  actions: RecordAction;
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
    <div className="flex">
      <div>{record.timestamp.toDate().toString()}</div>
      {isEditting ? (
        <div className="flex">
          <form className="flex">
            <input type="text" onChange={handleEditAmount} value={editAmount} />
            <span>円</span>
            <input
              type="text"
              onChange={handleEditPurpose}
              value={editPurpose}
            />
          </form>
          <div>
            <Button onClick={handleIsEditing}>X</Button>
            <Button onClick={handleEdit}>Save</Button>
          </div>
        </div>
      ) : (
        <div className="flex">
          <div>
            <div className="flex">
              ---{record.amount}
              <span>円</span>
              <div>---{record.purpose}</div>
            </div>
          </div>
          <div>
            <Button onClick={handleIsEditing}>EDIT</Button>
            <Button onClick={onDelete}>DELETE</Button>
          </div>
        </div>
      )}
    </div>
  );
};
