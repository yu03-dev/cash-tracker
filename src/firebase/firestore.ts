import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./config";

export type Record = {
  id?: string;
  amount: number;
  purpose: string;
  userId: string;
  timestamp: Timestamp;
};

const recordConverter: FirestoreDataConverter<Record> = {
  toFirestore(record: Record): DocumentData {
    return {
      amount: record.amount,
      purpose: record.purpose,
      userId: record.userId,
      timestamp: record.timestamp,
    };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Record {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      amount: data.amount,
      purpose: data.purpose,
      userId: data.userId,
      timestamp: data.timestamp,
    };
  },
};

const getRecords = async (userId: string): Promise<Record[]> => {
  const q = query(
    collection(db, "records").withConverter(recordConverter),
    where("userId", "==", userId),
    orderBy("timestamp", "desc")
  );
  const querySnapshot = await getDocs(q);
  const records = await querySnapshot.docs.map((doc) => doc.data());
  console.log("データを取得しました");
  return records;
};

const postRecord = async (record: Record): Promise<Record> => {
  const collRef = collection(db, "records").withConverter(recordConverter);
  const docRef = await addDoc(collRef, record);
  const docSnap = await getDoc(docRef);
  console.log("データを追加しました");
  return docSnap.data()!;
};

const updateRecord = async (record: Record): Promise<Record | null> => {
  const docRef = doc(db, "records", record.id!).withConverter(recordConverter);

  // docIdで指定したdocumentのuserIdが現在のユーザと一致するときupdate
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const uid = docSnap.get("userId");
    // [要確認] null == nullにならないか？
    if (uid == record.userId) {
      await updateDoc(docRef, {
        amount: record.amount,
        purpose: record.purpose,
      });
    } else {
      console.log("権限がありません");
      return null;
    }
    console.log("データを更新しました");
    return (await getDoc(docRef)).data()!;
  }
  console.log("データが存在しません");
  return null;
};

const deleteRecord = async (record: Record): Promise<Record | null> => {
  const docRef = doc(db, "records", record.id!).withConverter(recordConverter);

  // docIdで指定したdocumentのuserIdが現在のユーザと一致するときdelete
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const uid = docSnap.get("userId");
    if (uid == record.userId) {
      await deleteDoc(docRef);
    } else {
      console.log("権限がありません");
      return null;
    }
    console.log("データを削除しました");
    return docSnap.data();
  }
  console.log("データが存在しません");
  return null;
};

export { getRecords, postRecord, updateRecord, deleteRecord };
