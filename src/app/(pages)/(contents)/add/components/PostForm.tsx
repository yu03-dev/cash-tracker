"use client";
import {
  Button,
  Card,
  Input,
  Option,
  Select,
  Typography,
} from "@/app/common/lib/material-tailwind";
import React, { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { InputWrapper } from "@/app/common/components/InputWrapper";
import { NotExpenseCategory, categoryList } from "@/constant";
import { useMutateSnackbar } from "@/app/hooks/useMutateSnackbar";
import { useCreateRecord } from "../api/createRecord";
import { useRouter } from "next/navigation";

type FormInputsType = {
  price: string;
  category: string;
};

export const PostForm = () => {
  const router = useRouter();
  const { isLoading, createRecord } = useCreateRecord();
  const {
    formState: { errors, isValid },
    handleSubmit,
    reset,
    control,
  } = useForm<FormInputsType>({
    mode: "onChange",
    defaultValues: { price: "", category: "" },
  });

  const onSubmit = useCallback(
    async (data: FormInputsType) => {
      const submitData = {
        price: parseInt(data.price),
        category: data.category,
      };
      await createRecord(submitData);
      reset();
      router.refresh();
    },
    [reset, createRecord, router]
  );

  useMutateSnackbar({
    loadingText: "データを追加しています",
    completeText: "データを追加が完了しました",
    loading: isLoading,
  });

  return (
    <Card color="transparent" shadow={false} className="w-80 sm:w-96">
      <Typography variant="h4" color="blue-gray">
        データの追加
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        出費、または支給された金額を入力してください
      </Typography>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 w-full flex flex-col gap-6"
      >
        <Controller
          control={control}
          name="price"
          rules={{
            validate: (value) => {
              if (!value) {
                return "必須項目です";
              }
              if (isNaN(parseInt(value))) {
                return "数値を入力してください";
              }
              return true;
            },
          }}
          render={({ field }) => (
            <InputWrapper error={errors.price}>
              <Input
                size="lg"
                label="金額（必須）"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                error={errors.price?.message !== undefined}
              />
            </InputWrapper>
          )}
        />
        <Controller
          control={control}
          name="category"
          rules={{ required: "必須項目です" }}
          render={({ field }) => (
            <InputWrapper error={errors.category}>
              <Select
                size="lg"
                label="カテゴリ（必須）"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                error={errors.category?.message !== undefined}
              >
                {categoryList.map((category, index) => (
                  <Option key={index} value={category}>
                    {category === NotExpenseCategory
                      ? `(+)${category}`
                      : `(-)${category}`}
                  </Option>
                ))}
              </Select>
            </InputWrapper>
          )}
        />
        <Button fullWidth type="submit" color={isValid ? "light-blue" : "teal"}>
          Add
        </Button>
      </form>
    </Card>
  );
};
