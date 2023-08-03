import React, { ChangeEvent, useCallback, useState } from "react";

export const usePostForm = () => {
  const [amount, setAmount] = useState<number>(0);
  const [purpose, setPurpose] = useState<string>("");

  const handleAmount = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value));
  }, []);

  const handlePurpose = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 10) {
      alert("10文字以下にしてください");
      return;
    }
    setPurpose(e.target.value.trim());
  }, []);

  const initializeState = () => {
    setAmount(0);
    setPurpose("");
  };

  return { amount, purpose, handleAmount, handlePurpose, initializeState };
};
