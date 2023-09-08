"use client";
import { createRecord } from "@/app/store/api/records";
import {
  Button,
  Card,
  Input,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";

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
      console.log("Submit");
      const submitData = {
        price: parseInt(data.price),
        category: data.category,
      };
      console.log(submitData);
      await createRecord({ ...submitData });
      reset();
      router.push("/records");
      router.refresh();
    },
    [reset, router]
  );

  return (
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        データの追加
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        出費、または支給された金額を入力してください
      </Typography>
      <form
        className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-4 flex flex-col gap-6">
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
              <div className="flex flex-col w-fill gap-1">
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
              </div>
            )}
          />
          <Controller
            control={control}
            name="category"
            rules={{ required: "必須項目です" }}
            render={({ field }) => (
              <div className="flex flex-col w-fill gap-1">
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
                  {errors.category?.message
                    ? `※${errors.category?.message}`
                    : ""}
                </Typography>
              </div>
            )}
          />
        </div>
        <Button
          className="mt-6"
          fullWidth
          type="submit"
          color={isValid ? "light-blue" : "teal"}
        >
          Add
        </Button>
      </form>
    </Card>
  );
};
