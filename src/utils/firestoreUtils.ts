import { db } from "@/firebase/admin";
import { RecordsType } from "@/types";

const nonExpenseCategory = "支給";

export const isNotExpense = (category: string) => {
  return category === nonExpenseCategory;
};

export const getRecords = async (uid: string) => {
  const userRecordRef = db.collection("users").doc(uid).collection("records");
  const snapshot = await userRecordRef.get();
  const records = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as RecordsType;
  return records;
};
