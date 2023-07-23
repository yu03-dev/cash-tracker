import { Button } from "@/components/elements/Button";
import { auth } from "@/firebase/config";
import { signOut } from "firebase/auth";

export const SignOutButton = () => {
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      alert("ログアウトしました");
    } catch (error) {
      alert("ログアウトに失敗しました");
    }
  };

  return <Button title="SIGN OUT" onClick={handleSignOut} />;
};
