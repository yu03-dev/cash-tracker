import { Button } from "@/components/elements/Button";
import { auth } from "@/firebase/config";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export const SignOutButton = () => {
  const router = useRouter();
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      alert("ログアウトしました");
      router.push("/");
    } catch (error) {
      alert("ログアウトに失敗しました");
    }
  };

  return <Button title="SIGN OUT" onClick={handleSignOut} />;
};
