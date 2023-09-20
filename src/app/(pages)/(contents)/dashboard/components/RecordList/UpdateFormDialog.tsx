import { useCallback, useEffect } from "react";

import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Option,
  Select,
  Typography,
} from "@/app/common/lib/material-tailwind";
import { Controller, useForm } from "react-hook-form";
import { InputWrapper } from "@/app/common/components/InputWrapper";
import { useRecord } from "@/app/hooks/useRecords";
import { useRouter } from "next/navigation";
import { useMutateSnackbar } from "@/app/hooks/useMutateSnackbar";

type UpdateFormDialogProps = {
  isOpen: boolean;
  handleOpen: () => void;
  data: {
    recordId: string;
    currentPrice: number;
    currentCategory: string;
  };
};

type FormInputsType = {
  price: string;
  category: string;
};

export const UpdateFormDialog = (props: UpdateFormDialogProps) => {
  const {
    isOpen,
    handleOpen,
    data: { recordId, currentPrice, currentCategory },
  } = props;
  const router = useRouter();
  const { isLoading, updateRecord } = useRecord();
  const {
    formState: { errors, isValid },
    handleSubmit,
    control,
    reset,
  } = useForm<FormInputsType>({
    mode: "onChange",
    defaultValues: {
      price: currentPrice.toString(),
      category: currentCategory,
    },
  });

  const onSubmit = useCallback(
    async (data: FormInputsType) => {
      const submitData = {
        recordId: recordId,
        price: parseInt(data.price),
        category: data.category,
      };
      await updateRecord(submitData);
      router.refresh();
    },
    [recordId, router, updateRecord]
  );

  useEffect(() => {
    if (isOpen) {
      reset();
    }
  }, [isOpen, reset]);
  useMutateSnackbar({ actionText: "更新", loading: isLoading });

  return (
    <Dialog size="md" open={isOpen} handler={handleOpen}>
      <DialogHeader>
        <Typography variant="h5" color="blue-gray">
          データの更新
        </Typography>
      </DialogHeader>
      <DialogBody divider className="grid place-items-center gap-4 sm:px-16">
        <Typography color="gray" className="font-normal">
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
                  <Option value="支給">(+)支給</Option>
                  <Option value="食費">(-)食費</Option>
                  <Option value="交通費">(-)交通費</Option>
                  <Option value="その他">(-)その他</Option>
                </Select>
              </InputWrapper>
            )}
          />
          <Button
            fullWidth
            type="submit"
            color={isValid ? "light-blue" : "teal"}
            onClick={handleOpen}
          >
            update
          </Button>
        </form>
      </DialogBody>
      <DialogFooter>
        <Button variant="text" color="blue-gray" onClick={handleOpen}>
          close
        </Button>
      </DialogFooter>
    </Dialog>
  );
};
