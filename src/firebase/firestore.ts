import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./config";

export type PostData = {
  amount: number;
  purpose: string;
  userId: string | undefined;
};

const getRecords = async (userId: string | undefined) => {
  if (userId == undefined) {
    return console.log("ログインしていません");
  }
  const q = query(collection(db, "records"), where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    console.log(doc.id, "=>", doc.data());
  });
};

const postRecord = async ({ amount, purpose, userId }: PostData) => {
  if (userId == undefined) {
    return console.log("ログインしていません");
  }
  const docRef = await addDoc(collection(db, "records"), {
    amount,
    purpose,
    userId,
    timestamp: Timestamp.fromDate(new Date()),
  });
  console.log("追加されたドキュメントID:", docRef.id);
};

const updateRecord = async (
  docId: string,
  { amount, purpose, userId }: PostData
) => {
  const docRef = doc(db, "records", docId);

  // docIdで指定したdocumentのuserIdが現在のユーザと一致するときupdate
  const docSnap = await getDoc(docRef);
  const id = docSnap.get("userId");
  if (id == userId) {
    await updateDoc(docRef, {
      amount,
      purpose,
    });
    console.log("データを更新しました");
  } else {
    console.log("権限がありません");
  }
};

const deleteRecord = async (docId: string, userId: string | undefined) => {
  const docRef = doc(db, "records", docId);

  // docIdで指定したdocumentのuserIdが現在のユーザと一致するときdelete
  const docSnap = await getDoc(docRef);
  const id = docSnap.get("userId");
  if (id == userId) {
    await deleteDoc(docRef);
    console.log("データを削除しました");
  } else {
    console.log("権限がありません");
  }
};

export { getRecords, postRecord, updateRecord, deleteRecord };
