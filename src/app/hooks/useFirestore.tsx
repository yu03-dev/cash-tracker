import {
  deleteRecord,
  getRecords,
  postRecord,
  updateRecord,
} from "@/app/firebase/firestore";
import { PostType, RecordType } from "@/app/types";
import { useCallback, useEffect, useState } from "react";
import { useUserContext } from "./context";
import { User } from "firebase/auth";
import { Timestamp } from "firebase/firestore";

export const useFirestore = () => {
  const [records, setRecords] = useState<RecordType[]>([]);
  const { user } = useUserContext();

  useEffect(() => {
    const fetchRecords = async (currentUser: User) => {
      const newRecords = await getRecords(currentUser.uid);
      setRecords(newRecords);
    };
    if (user) {
      fetchRecords(user);
    }
  }, [user]);

  const handleAdd = useCallback(
    ({ amount, purpose }: PostType) => {
      const postData: RecordType = {
        amount,
        purpose,
        userId: user?.uid!,
        timestamp: Timestamp.fromDate(new Date()),
      };
      const setCreatedRecord = async (postData: RecordType) => {
        const newRecord = await postRecord(postData);
        setRecords((prevRecords) => {
          if (prevRecords.length == 0) {
            return [newRecord];
          }
          return [newRecord, ...prevRecords];
        });
      };
      setCreatedRecord(postData);
    },
    [user]
  );

  const handleUpdate = useCallback(
    (docId: string, { amount, purpose }: PostType) => {
      const setUpdatedRecord = async (userId: string) => {
        const newRecords = [...records];
        const editedRecord = await updateRecord(docId, userId, {
          amount,
          purpose,
        });
        if (editedRecord) {
          const updatedRecords = newRecords.map((record) => {
            if (record.id == docId) {
              record = editedRecord;
            }
            return record;
          });
          setRecords(updatedRecords);
        }
      };
      if (user) {
        setUpdatedRecord(user.uid);
      }
    },
    [user, records]
  );

  const handleDelete = useCallback(
    (docId: string) => {
      const setDeletedRecord = async (userId: string) => {
        const deletedRecord = await deleteRecord(docId, userId);
        if (deletedRecord) {
          const newRecords = records.filter(
            (record) => record.id !== deletedRecord?.id
          );
          setRecords(newRecords);
        }
      };
      if (user) {
        setDeletedRecord(user.uid);
      }
    },
    [user, records]
  );

  return { records, handleAdd, handleUpdate, handleDelete };
};
