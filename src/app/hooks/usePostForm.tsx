import { ChangeEvent, useCallback, useState } from "react";

export const usePostForm = () => {
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

  const initializeState = () => {
    setPrice(0);
    setCategory("");
  };

  return {
    price,
    category,
    handlePrice,
    handleCategory,
    initializeState,
  };
};
