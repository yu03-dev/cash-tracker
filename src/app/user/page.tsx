"use client";
import { SignOutButton } from "@/components/SignOutButton";
import { useUserContext } from "@/hooks/context";
import { Button } from "@/components/elements/Button";
import {
  Record,
  deleteRecord,
  getRecords,
  postRecord,
  updateRecord,
} from "@/firebase/firestore";
import { User } from "firebase/auth";
import { Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function Page() {
  const { user, isloading, error } = useUserContext();
  const [records, setRecords] = useState<Record[]>();

  // example
  const postData: Record = {
    amount: -999,
    purpose: "ご飯",
    userId: "NhESkFqWjXaolAVkzyfKlgGZZFV2",
    timestamp: Timestamp.fromDate(new Date()),
  };

  const updateData: Record = {
    id: "om3ZNFhNl35XJEjvCKWr",
    amount: 1500,
    purpose: "支給",
    userId: "NhESkFqWjXaolAVkzyfKlgGZZFV2",
    timestamp: Timestamp.fromDate(new Date()), // 定義しても使われないけど設定
  };

  const deleteData: Record = {
    id: "om3ZNFhNl35XJEjvCKWr",
    amount: 1500,
    purpose: "支給",
    userId: "NhESkFqWjXaolAVkzyfKlgGZZFV2",
    timestamp: Timestamp.fromDate(new Date()),
  };

  // 前回マウント時からuserが変更された場合にのみ実行
  // これがないと、contextの再レンダリング時にも実行されてしまう
  useEffect(() => {
    const fetch = async (currentUser: User) => {
      const newRecords: Record[] = await getRecords(currentUser.uid);
      setRecords(newRecords);
    };
    if (user) {
      fetch(user);
    }
  }, [user]);

  const handlePost = async (postData: Record) => {
    const addedRecord = await postRecord(postData);
    setRecords((prevRecords) => {
      return [addedRecord, ...prevRecords!];
    });
  };

  useEffect(() => {
    console.log(records);
  }, [records]);

  return (
    <div>
      {isloading ? (
        <h1>Now Loading...</h1>
      ) : (
        <div>
          <h1>ユーザー情報</h1>
          <p>名前：{user?.displayName}</p>
          <p>Email:{user?.email}</p>
          <p>UserId:{user?.uid}</p>
          <h1>記録</h1>
          {records?.map((record) => (
            <div className="flex" key={record.id}>
              <p>Time:{record.timestamp.toDate().toString()}</p>
              <p>Amount:{record.amount}</p>
              <p>Purpose:{record.purpose}</p>
            </div>
          ))}
          <div>
            <Button title="POST" onClick={() => handlePost(postData)} />
            <Button title="UPDATE" onClick={() => updateRecord(updateData)} />
            <Button title="DELETE" onClick={() => deleteRecord(deleteData)} />
          </div>
          <SignOutButton />
        </div>
      )}
    </div>
  );
}
