import { auth } from "@/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";

// ログイン画面を初めてレンダリングした時に監視を始める
export const useCheckAuth = () => {
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // 最終的にはここでログインユーザの情報をグローバルに設定
        console.log("以下はログイン済みユーザのidとemailです");
        console.log(user.uid);
        console.log(user.email);
      } else {
        console.log("ログインしてません");
      }
    });
  }, []);
};
