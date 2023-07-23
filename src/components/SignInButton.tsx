import { Button } from "@/components/elements/Button";
import { auth, provider } from "@/firebase/config";
import {
  Auth,
  getRedirectResult,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
import { useEffect } from "react";

const logInAlert = async (auth: Auth) => {
  const userCred = await getRedirectResult(auth);
  if (userCred) {
    const user = userCred.user;
    alert(`${user.displayName}(${user.email})でログインしました`);
  }
};

export const SignInButton = () => {
  const handleSignIn = async () => {
    try {
      await signInWithRedirect(auth, provider);
      // 以下はPopupの場合 COOPでwindowが閉じてしまう...
      // const userCred = await signInWithPopup(auth, provider);
      // if (userCred) {
      //   const user = userCred.user;
      //   alert(`${user.displayName}(${user.email})でログインしました`);
      // }
    } catch (error) {
      console.error(error);
    }
  };

  // handleSignInの後リダイレクトバックした時のみ
  // 「ログインしたよ」のアラートを出す
  useEffect(() => {
    logInAlert(auth);
  });

  return <Button title="SIGN IN" onClick={handleSignIn} />;
};
