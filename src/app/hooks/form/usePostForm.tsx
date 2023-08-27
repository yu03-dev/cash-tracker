import { PostDataType, zMessageResponse } from "@/types";
import { useRouter } from "next/navigation";
import { ChangeEvent, useCallback, useState } from "react";

export const usePostForm = () => {
  const router = useRouter();
  const [price, setPrice] = useState<number>(0);
  const [category, setCategory] = useState<string>("");

  const handlePrice = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const parsed = parseInt(e.target.value);
    if (isNaN(parsed)) {
      setPrice(0);
    } else {
      setPrice(parsed);
    }
  }, []);

  const handleCategory = useCallback((selectedValue: string | undefined) => {
    if (selectedValue) {
      setCategory(selectedValue);
    }
  }, []);

  const handleAdd = useCallback(
    async ({ price, category }: PostDataType) => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/records`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ price, category }),
          }
        );
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const { message } = zMessageResponse.parse(await response.json());
        console.log(message);
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error", error.message);
        } else {
          console.error(error);
        }
      }
      router.push("/records/index");
      router.refresh();
    },
    [router]
  );

  return {
    price,
    category,
    handlePrice,
    handleCategory,
    handleAdd,
  };
};
