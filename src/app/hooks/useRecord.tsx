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
  const [editPrice, setEditPrice] = useState<number>(record.price);
  const [editCategory, setEditCategory] = useState<string>(record.category);
  const handleIsEditing = () => {
    setEditPrice(record.price);
    setEditCategory(record.category);
    setIsEditting((state) => !state);
  };

  const handleEditPrice = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const parsed = parseInt(e.target.value);
    if (isNaN(parsed)) {
      setEditPrice(0);
    } else {
      setEditPrice(parsed);
    }
  }, []);

  const handleEditCategory = useCallback(
    (selectedValue: string | undefined) => {
      if (selectedValue) {
        setEditCategory(selectedValue);
      }
    },
    []
  );

  const onUpdate = useCallback(() => {
    actions.handleUpdate(record.id, {
      price: editPrice,
      category: editCategory,
    });
    setIsEditting(false);
  }, [record, editPrice, editCategory, actions]);

  const onDelete = useCallback(() => {
    actions.handleDelete(record.id);
  }, [actions, record]);
  return {
    isEditting,
    editPrice,
    editCategory,
    handleIsEditing,
    handleEditPrice,
    handleEditCategory,
    onUpdate,
    onDelete,
  };
};
