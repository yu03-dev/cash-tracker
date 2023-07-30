import { Button } from "@/components/elements/Button";
import { auth, provider } from "@/firebase/config";
import {
  Auth,
  getRedirectResult,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const logInAlert = async (auth: Auth, router: AppRouterInstance) => {
  const userCred = await getRedirectResult(auth);
  if (userCred) {
    const user = userCred.user;
    alert(`${user.displayName}(${user.email})でログインしました`);
    router.push("/user");
  }
};

export const SignInButton = () => {
  const router = useRouter();
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
    logInAlert(auth, router);
  });

  return <Button title="SIGN IN" onClick={handleSignIn} />;
};
