"use client";
import { useUserContext } from "@/components/UserContext";

export default function Page() {
  const { user, isloading, error } = useUserContext();
  return (
    <div>
      <h1>ユーザー情報</h1>
      <p>名前：{user?.displayName}</p>
      <p>Email:{user?.email}</p>
    </div>
  );
}
