import { auth } from "@/app/firebase/client";
import { Button } from "@material-tailwind/react";
import {
  size,
  variant,
} from "@material-tailwind/react/types/components/button";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export const SignOutButton = ({
  variant,
  size,
  style,
}: {
  variant: variant | undefined;
  size: size | undefined;
  style: string;
}) => {
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

  return (
    <Button
      variant={variant}
      size={size}
      className={style}
      onClick={handleSignOut}
    >
      <span>SignOut</span>
    </Button>
  );
};
