"use client";
import { PostForm } from "@/app/components/dashboard/PostForm";
import { useFirestore } from "@/app/hooks/useFirestore";
import { RecordList } from "@/app/components/dashboard/RecordList";

export default function Page() {
  const { records, handleAdd, handleUpdate, handleDelete } = useFirestore();

  return (
    <div>
      <div className="pt-10">
        <div className="flex justify-center mb-4">
          <PostForm handleAdd={handleAdd} />
        </div>
        <div className="mx-auto max-w-screen-xl py-2 px-4 lg:px-8 lg:py-4">
          <RecordList
            records={records}
            actions={{ handleUpdate, handleDelete }}
          />
        </div>
      </div>
    </div>
  );
}
