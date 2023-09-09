import { db } from "@/firebase/admin";
import { RecordsType } from "@/types";

export const getRecords = async (uid: string) => {
  const userRecordRef = db.collection("users").doc(uid).collection("records");
  const snapshot = await userRecordRef.get();

  // docまたはsub-collectionが存在しない場合はrecordsは[]
  const records = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as RecordsType;
  return records;
};

export const getOrderedRecords = async (uid: string) => {
  const userRecordRef = db.collection("users").doc(uid).collection("records");
  const snapshot = await userRecordRef.orderBy("createdAt", "desc").get();

  // docまたはsub-collectionが存在しない場合はrecordsは[]
  const records = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as RecordsType;
  return records;
};
