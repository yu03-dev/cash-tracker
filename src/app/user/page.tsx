"use client";
import { useUserContext } from "@/components/UserContext";
import { Button } from "@/components/elements/Button";
import {
  PostData,
  deleteRecord,
  getRecords,
  postRecord,
  updateRecord,
} from "@/firebase/firestore";
import { useEffect } from "react";

export default function Page() {
  const { user, isloading, error } = useUserContext();

  // example
  const postData: PostData = {
    amount: 300,
    purpose: "本",
    userId: user?.uid,
  };

  // example
  const updateId: string = "KHTLWphfORDVF7ZkkSJ0";
  const deleteId: string = "KHTLWphfORDVF7ZkkSJ0";

  // 前回マウント時からuserが変更された場合にのみ実行
  // これがないと、contextの再レンダリング時にも実行されてしまう
  useEffect(() => {
    getRecords(user?.uid);
  }, [user]);

  return (
    <div>
      <h1>ユーザー情報</h1>
      <p>名前：{user?.displayName}</p>
      <p>Email:{user?.email}</p>
      <Button title="POST" onClick={() => postRecord(postData)} />
      <Button title="UPDATE" onClick={() => updateRecord(updateId, postData)} />
      <Button
        title="DELETE"
        onClick={() => deleteRecord(deleteId, user?.uid)}
      />
    </div>
  );
}
