"use client";
import { InputWrapper } from "@/app/common/components/InputWrapper";
import {
  Card,
  Input,
  Button,
  Typography,
} from "@/app/common/lib/material-tailwind";
import { useAuth } from "@/app/hooks/useAuth";
import { auth, provider } from "@/firebase/client";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";

type FormInputsType = {
  email: string;
  password: string;
};

export default function Page() {
  const { login } = useAuth();
  const [isShowPassword, setIsShowPassword] = useState(false);

  const {
    formState: { errors, isValid },
    handleSubmit,
    reset,
    control,
  } = useForm<FormInputsType>({
    mode: "onChange",
    defaultValues: { email: "", password: "" },
  });

  const handleSignInWithGoggle = useCallback(async () => {
    const userCredential = await signInWithPopup(auth, provider);
    const idToken = await userCredential.user.getIdToken();
    await login(idToken);
  }, [login]);

  const onSubmit = useCallback(
    async (data: FormInputsType) => {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const idToken = await userCredential.user.getIdToken();
      await login(idToken);
      reset();
    },
    [login, reset]
  );

  return (
    <div className="container mx-auto px-8 py-8 lg:px-14 lg:py-12 w-full flex justify-center">
      <Card color="transparent" shadow={false} className="w-80 sm:w-96">
        <Typography variant="h4" color="blue-gray">
          Sign In
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter your Email and Password.
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
          <Button
            type="submit"
            color={isValid ? "light-blue" : "teal"}
            fullWidth
          >
            Sign in
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
          You don{"'"}t have any account? <br />
          <Link href="/signup" className="font-medium text-blue-600 underline">
            Sign Up
          </Link>
        </Typography>
      </Card>
    </div>
  );
}
