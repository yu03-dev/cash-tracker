"use client";
import { InputWrapper } from "@/components/InputWrapper";
import { Card, Input, Button, Typography } from "@/lib/material-tailwind";
import { useLogin } from "@/app/hooks/useLogin";
import { useMutateSnackbar } from "@/app/hooks/useMutateSnackbar";
import { auth, provider } from "@/firebase/client";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";

type FormInputsType = {
  email: string;
  password: string;
  repassword: string;
};

export default function Page() {
  const router = useRouter();
  const { isLoading, login } = useLogin();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowRePassword, setIsShowRePassword] = useState(false);

  const {
    formState: { errors, isValid },
    handleSubmit,
    control,
    getValues,
  } = useForm<FormInputsType>({
    mode: "onChange",
    defaultValues: { email: "", password: "", repassword: "" },
  });

  useMutateSnackbar({
    loadingText: "ログインしています",
    completeText: "ログインしました",
    loading: isLoading,
  });

  // Googleアカウントでログイン
  const handleSignInWithGoggle = useCallback(async () => {
    const userCredential = await signInWithPopup(auth, provider);
    const idToken = await userCredential.user.getIdToken();
    await login(idToken);
    router.push("/dashboard");
  }, [login, router]);

  // メール&パスワードでログイン
  const onSubmit = useCallback(
    async (data: FormInputsType) => {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          data.email,
          data.password
        );
        const idToken = await userCredential.user.getIdToken();
        await login(idToken);
        router.push("/dashboard");
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        } else {
          console.error(error);
        }
      }
    },
    [login, router]
  );

  return (
    <div className="container mx-auto px-8 py-8 lg:px-14 lg:py-12 w-full flex justify-center">
      <Card color="transparent" shadow={false} className="w-80 sm:w-96">
        <Typography variant="h4" color="blue-gray">
          Register your Account
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter your Email, Password and Confirmation
        </Typography>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 w-full flex flex-col gap-6"
        >
          <Controller
            control={control}
            name="email"
            rules={{
              required: "必須項目です",
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: "メールアドレスの形式が正しくありません",
              },
            }}
            render={({ field }) => (
              <InputWrapper error={errors.email}>
                <Input
                  size="lg"
                  label="Email"
                  type="email"
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  error={errors.email?.message !== undefined}
                />
              </InputWrapper>
            )}
          />
          <Controller
            control={control}
            name="password"
            rules={{
              required: "必須項目です",
              minLength: {
                value: 8,
                message: "パスワードは8文字以上にしてください",
              },
            }}
            render={({ field }) => (
              <InputWrapper error={errors.password}>
                <Input
                  size="lg"
                  label="Password"
                  type={isShowPassword ? "text" : "password"}
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  error={errors.password?.message !== undefined}
                  icon={
                    isShowPassword ? (
                      <EyeSlashIcon
                        onClick={() => setIsShowPassword((prev) => !prev)}
                        className="cursor-pointer"
                      />
                    ) : (
                      <EyeIcon
                        onClick={() => setIsShowPassword((prev) => !prev)}
                        className="cursor-pointer"
                      />
                    )
                  }
                />
              </InputWrapper>
            )}
          />
          <Controller
            control={control}
            name="repassword"
            rules={{
              validate: (value) => {
                if (value !== getValues().password) {
                  return "パスワードが一致しません";
                }
              },
            }}
            render={({ field }) => (
              <InputWrapper error={errors.repassword}>
                <Input
                  size="lg"
                  label="Password again"
                  type={isShowRePassword ? "text" : "password"}
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  error={errors.repassword?.message !== undefined}
                  icon={
                    isShowRePassword ? (
                      <EyeSlashIcon
                        onClick={() => setIsShowRePassword((prev) => !prev)}
                        className="cursor-pointer"
                      />
                    ) : (
                      <EyeIcon
                        onClick={() => setIsShowRePassword((prev) => !prev)}
                        className="cursor-pointer"
                      />
                    )
                  }
                />
              </InputWrapper>
            )}
          />
          <Button
            type="submit"
            color={isValid ? "light-blue" : "teal"}
            fullWidth
          >
            Register
          </Button>
        </form>
        <button
          onClick={handleSignInWithGoggle}
          className="border border-gray-400 rounded-sm hover:bg-gray-300 bg-white flex items-center w-full mt-6 gap-x-4"
        >
          <Image
            src="/btn_google_light_normal_ios.svg"
            alt="google"
            width={46}
            height={46}
          />
          Sign in with Goggle
        </button>
        <Typography color="gray" className="mt-4 text-center font-normal">
          You already have an account? <br />
          <Link href="/login" className="font-medium text-blue-600 underline">
            Sign in
          </Link>
        </Typography>
      </Card>
    </div>
  );
}
