import { ChangeEvent, useCallback, useState } from "react";
import { RecordAction, RecordType } from "../types";

export const useRecord = ({
  record,
  actions,
}: {
  record: RecordType;
  actions: RecordAction;
}) => {
  const [isEditting, setIsEditting] = useState<boolean>(false);
  const [editAmount, setEditAmount] = useState<number>(record.amount);
  const [editPurpose, setEditPurpose] = useState<string>(record.purpose);
  const handleIsEditing = () => {
    setEditAmount(record.amount);
    setEditPurpose(record.purpose);
    setIsEditting((state) => !state);
  };

  const handleEditAmount = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setEditAmount(Number(e.target.value));
  }, []);

  const handleEditPurpose = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 10) {
      alert("10文字以下にしてください");
      return;
    }
    setEditPurpose(e.target.value.trim());
  }, []);

  const handleEdit = useCallback(() => {
    actions.handleUpdate(record.id!, {
      amount: editAmount,
      purpose: editPurpose,
    });
    setIsEditting(false);
  }, [record, editAmount, editPurpose, actions]);

  const onDelete = useCallback(() => {
    actions.handleDelete(record.id!);
  }, [actions, record]);
  return {
    isEditting,
    editAmount,
    editPurpose,
    handleIsEditing,
    handleEditAmount,
    handleEditPurpose,
    handleEdit,
    onDelete,
  };
};
