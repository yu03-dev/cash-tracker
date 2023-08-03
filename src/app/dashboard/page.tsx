"use client";
import { PostForm } from "@/app/components/dashboard/PostForm";
import { useFirestore } from "@/app/hooks/useFirestore";
import { RecordList } from "@/app/components/dashboard/RecordList";

export default function Page() {
  const { records, handleAdd, handleUpdate, handleDelete } = useFirestore();

  return (
    <div>
      <div className="pt-10">
        <PostForm handleAdd={handleAdd} />
        <h1>記録</h1>
        <RecordList
          records={records}
          actions={{ handleUpdate, handleDelete }}
        />
      </div>
    </div>
  );
}
