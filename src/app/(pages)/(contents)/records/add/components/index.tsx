"use client";
import { createRecord } from "@/app/store/api/client/records";
import {
  Button,
  Card,
  Input,
  Option,
  Select,
  Typography,
} from "@/app/common/lib/material-tailwind";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { FormContainer } from "@/app/common/components/FormContainer";
import { FormInput } from "@/app/common/components/FormInput";

type FormInputsType = {
  price: string;
  category: string;
};

export const PostForm = () => {
  const router = useRouter();
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
      router.push("/records");
      router.refresh();
    },
    [reset, router]
  );

  return (
    <Card color="transparent" shadow={false} className="w-80 sm:w-96">
      <Typography variant="h4" color="blue-gray">
        データの追加
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        出費、または支給された金額を入力してください
      </Typography>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
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
            <FormInput>
              <Input
                size="lg"
                label="金額（必須）"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                error={errors.price?.message !== undefined}
              />
              <Typography variant="paragraph" color="red">
                {errors.price?.message ? `※${errors.price?.message}` : ""}
              </Typography>
            </FormInput>
          )}
        />
        <Controller
          control={control}
          name="category"
          rules={{ required: "必須項目です" }}
          render={({ field }) => (
            <FormInput>
              <Select
                size="lg"
                label="カテゴリ（必須）"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                error={errors.category?.message !== undefined}
              >
                <Option value="支給">(+)支給</Option>
                <Option value="食費">(-)食費</Option>
                <Option value="交通費">(-)交通費</Option>
                <Option value="その他">(-)その他</Option>
              </Select>
              <Typography variant="paragraph" color="red">
                {errors.category?.message ? `※${errors.category?.message}` : ""}
              </Typography>
            </FormInput>
          )}
        />
        <Button fullWidth type="submit" color={isValid ? "light-blue" : "teal"}>
          Add
        </Button>
      </FormContainer>
    </Card>
  );
};
