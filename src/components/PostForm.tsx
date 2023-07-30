"use client";
import { Record, postRecord } from "@/firebase/firestore";
import { useUserContext } from "@/hooks/context";
import { Timestamp } from "firebase/firestore";
import React, { useCallback, useMemo, useState } from "react";

export const PostForm = () => {
  const [amount, setAmount] = useState<number>(0);
  const [purpose, setPurpose] = useState<string>("");
  const { user, isloading, error } = useUserContext();

  const handleAmount = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value));
  }, []);

  const handlePurpose = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.value.length > 10) {
        alert("10文字以下にしてください");
        return;
      }
      setPurpose(e.target.value.trim());
    },
    []
  );

  const handlePost = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      const post: Record = {
        amount,
        purpose,
        userId: user?.uid!,
        timestamp: Timestamp.fromDate(new Date()),
      };
      await postRecord(post);
      // ここで"/user"画面のrecordが変更されない
      // Contextを使ってrecordsをglobalに管理する or getRecordsを呼び出す
    },
    [amount, purpose, user]
  );

  return (
    <form className="w-full max-w-sm">
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label
            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            htmlFor="amount"
          >
            金額
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            type="text"
            id="amount"
            value={amount}
            onChange={handleAmount}
          />
        </div>
      </div>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label
            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            htmlFor="purpose"
          >
            用途
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            type="text"
            id="purpose"
            value={purpose}
            onChange={handlePurpose}
          />
        </div>
      </div>
      <div className="md:flex md:items-center">
        <div className="md:w-1/3"></div>
        <div className="md:w-2/3">
          <button
            className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            onClick={handlePost}
          >
            追加
          </button>
        </div>
      </div>
    </form>
  );
};
