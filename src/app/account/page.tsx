"use client";
import React from "react";
import { useUserContext } from "../hooks/context";

export default function Page() {
  const { user, isloading } = useUserContext();
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
        </div>
      )}
    </div>
  );
}
