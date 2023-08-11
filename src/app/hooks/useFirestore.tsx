import { PostType, RecordType } from "@/app/types";
import { useCallback, useEffect, useState } from "react";
import { useUserContext } from "./context";
import { User } from "firebase/auth";

export const useFirestore = () => {
  const [records, setRecords] = useState<RecordType[]>([]);
  const { user } = useUserContext();

  useEffect(() => {
    const fetchRecords = async (currentUser: User) => {
      const idToken = await currentUser.getIdToken();
      const response = await fetch("http://localhost:3000/api/records", {
        method: "GET",
        headers: {
          Authorization: idToken,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const newRecords = (await response.json()) as RecordType[];
        setRecords(newRecords);
      }
    };

    if (user) {
      fetchRecords(user);
    }
  }, [user]);

  const handleAdd = useCallback(
    ({ price, category }: PostType) => {
      const setCreatedRecord = async (
        currentUser: User,
        { price, category }: PostType
      ) => {
        const idToken = await currentUser.getIdToken();
        const response = await fetch("http://localhost:3000/api/records", {
          method: "POST",
          headers: {
            Authorization: idToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ price, category }),
        });
        if (response.ok) {
          const createdRecord = (await response.json()) as RecordType;
          setRecords((prevRecords) => {
            if (prevRecords.length == 0) {
              return [createdRecord];
            }
            return [createdRecord, ...prevRecords];
          });
        }
      };

      if (user) {
        setCreatedRecord(user, { price, category });
      }
    },
    [user]
  );

  const handleUpdate = useCallback(
    (docId: string, { price, category }: PostType) => {
      const setUpdatedRecord = async (
        currentUser: User,
        docId: string,
        { price, category }: PostType
      ) => {
        const idToken = await currentUser.getIdToken();
        const response = await fetch(
          `http://localhost:3000/api/records/${docId}`,
          {
            method: "PUT",
            headers: {
              Authorization: idToken,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ price, category }),
          }
        );
        if (response.ok) {
          const updatedRecord = (await response.json()) as RecordType;
          const newRecords = records.map((record) => {
            if (record.id == docId) {
              record = updatedRecord;
            }
            return record;
          });
          setRecords(newRecords);
        }
      };

      if (user) {
        setUpdatedRecord(user, docId, { price, category });
      }
    },
    [user, records]
  );

  const handleDelete = useCallback(
    (docId: string) => {
      const setDeletedRecord = async (currentUser: User, docId: string) => {
        const idToken = await currentUser.getIdToken();
        const response = await fetch(
          `http://localhost:3000/api/records/${docId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: idToken,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          const deletedRecord = (await response.json()) as RecordType;
          const newRecords = records.filter(
            (record) => record.id !== deletedRecord.id
          );
          setRecords(newRecords);
        }
      };

      if (user) {
        setDeletedRecord(user, docId);
      }
    },
    [user, records]
  );

  return { records, handleAdd, handleUpdate, handleDelete };
};
