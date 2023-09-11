import { useCallback } from "react";

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
import { FormContainer } from "@/app/common/components/FormContainer";
import { FormInput } from "@/app/common/components/FormInput";
import { updateRecord } from "@/app/store/api/client/records";
import { useRouter } from "next/navigation";

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
      handleOpen();
      router.refresh();
    },
    [recordId, handleOpen, router]
  );

  const handler = () => {
    handleOpen();
    reset();
  };

  return (
    <Dialog size="md" open={isOpen} handler={handler}>
      <DialogHeader>
        <Typography variant="h5" color="blue-gray">
          データの更新
        </Typography>
      </DialogHeader>
      <DialogBody divider className="grid place-items-center gap-4 sm:px-16">
        <Typography color="gray" className="font-normal">
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
                  {errors.category?.message
                    ? `※${errors.category?.message}`
                    : ""}
                </Typography>
              </FormInput>
            )}
          />
          <Button
            fullWidth
            type="submit"
            color={isValid ? "light-blue" : "teal"}
          >
            update
          </Button>
        </FormContainer>
      </DialogBody>
      <DialogFooter>
        <Button variant="text" color="blue-gray" onClick={handler}>
          close
        </Button>
      </DialogFooter>
    </Dialog>
  );
};
