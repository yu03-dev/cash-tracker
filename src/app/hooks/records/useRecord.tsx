import { ChangeEvent, useCallback, useState } from "react";
import { PostType, RecordType } from "@/types";
import { useRouter } from "next/navigation";

export const useRecord = (record: RecordType) => {
  const router = useRouter();

  const [isEditting, setIsEditting] = useState<boolean>(false);
  const [editPrice, setEditPrice] = useState<number>(record.price);
  const [editCategory, setEditCategory] = useState<string>(record.category);

  const handleIsEditing = () => {
    setEditPrice(record.price);
    setEditCategory(record.category);
    setIsEditting((prev) => !prev);
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

  const handleUpdate = useCallback(
    async ({ price, category }: PostType) => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/records/${record.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ price, category }),
          }
        );
        const parsedResponse = await response.json();
        console.log(parsedResponse);
      } catch (error) {
        console.error(error);
      }
      router.refresh();
      setIsEditting(false);
    },
    [record, router]
  );

  const handleDelete = useCallback(async () => {
    if (confirm("本当に削除しますか?")) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/records/${record.id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const parsedResponse = await response.json();
        console.log(parsedResponse);
      } catch (error) {
        console.error(error);
      }
      router.refresh();
      setIsEditting(false);
    }
  }, [record, router]);

  return {
    isEditting,
    editPrice,
    editCategory,
    handleIsEditing,
    handleEditPrice,
    handleEditCategory,
    handleUpdate,
    handleDelete,
  };
};
