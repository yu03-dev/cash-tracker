import { ChangeEvent, useCallback, useState } from "react";

export const usePostForm = () => {
  const [price, setPrice] = useState<number>(0);
  const [category, setCategory] = useState<string>("");

  const handlePrice = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setPrice(parseInt(e.target.value));
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

  return { price, category, handlePrice, handleCategory, initializeState };
};
