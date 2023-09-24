import React, { useCallback } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@/lib/material-tailwind";
import { useRouter } from "next/navigation";
import { useMutateSnackbar } from "@/app/hooks/useMutateSnackbar";
import { useDeleteRecord } from "../../api/deleteRecord";

type DeleteDialogProps = {
  isOpen: boolean;
  handleOpen: () => void;
  recordId: string;
};

export function DeleteDialog(props: DeleteDialogProps) {
  const { isLoading, deleteRecord } = useDeleteRecord();
  const { isOpen, handleOpen, recordId } = props;
  const router = useRouter();

  const handleDelete = useCallback(async () => {
    handleOpen();
    await deleteRecord({ recordId });
    router.refresh();
  }, [handleOpen, recordId, router, deleteRecord]);

  useMutateSnackbar({
    loadingText: "データを削除しています",
    completeText: "データの削除が完了しました",
    loading: isLoading,
  });

  return (
    <Dialog size="md" open={isOpen} handler={handleOpen}>
      <DialogHeader>
        <Typography variant="h5" color="blue-gray">
          データの削除
        </Typography>
      </DialogHeader>
      <DialogBody divider className="grid place-items-center gap-4 py-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-16 w-16 text-red-500"
        >
          <path
            fillRule="evenodd"
            d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
            clipRule="evenodd"
          />
        </svg>
        <Typography color="red" variant="h4">
          本当にデータを削除しますか？
        </Typography>
        <Typography className="text-center font-normal">
          一度消すともとに戻せません。
        </Typography>
      </DialogBody>
      <DialogFooter className="space-x-2">
        <Button variant="text" color="blue-gray" onClick={handleOpen}>
          閉じる
        </Button>
        <Button variant="gradient" onClick={handleDelete}>
          削除する
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
