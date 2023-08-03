import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
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
import { PostType, RecordType } from "@/app/types";

const recordConverter: FirestoreDataConverter<RecordType> = {
  toFirestore(record: RecordType): DocumentData {
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
  ): RecordType {
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

const getRecords = async (userId: string): Promise<RecordType[]> => {
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

const postRecord = async (record: RecordType): Promise<RecordType> => {
  const collRef = collection(db, "records").withConverter(recordConverter);
  const docRef = await addDoc(collRef, record);
  const docSnap = await getDoc(docRef);
  console.log("データを追加しました");
  return docSnap.data()!;
};

const updateRecord = async (
  docId: string,
  userId: string,
  { amount, purpose }: PostType
): Promise<RecordType | null> => {
  const docRef = doc(db, "records", docId).withConverter(recordConverter);

  // docIdで指定したdocumentのuserIdが現在のユーザと一致するときupdate
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const uid = docSnap.get("userId");
    if (uid == userId) {
      await updateDoc(docRef, {
        amount,
        purpose,
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

const deleteRecord = async (
  docId: string,
  userId: string
): Promise<RecordType | null> => {
  const docRef = doc(db, "records", docId).withConverter(recordConverter);

  // docIdで指定したdocumentのuserIdが現在のユーザと一致するときdelete
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const uid = docSnap.get("userId");
    if (uid == userId) {
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
