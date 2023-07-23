import { NextRequest, NextResponse } from "next/server";
import { db } from "@/firebase/config";
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

export const GET = async (
  req: NextRequest,
  { params }: { params: { uid: string } }
) => {
  const q = query(collection(db, "records"), where("userId", "==", params.uid));
  const querySnapshot = await getDocs(q);
  const records = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    document: doc.data(),
  }));
  return NextResponse.json({
    message: "データを取得しました",
    records: records,
  });
};

export const POST = async (
  req: Request,
  { params }: { params: { uid: string } }
) => {
  const res = await req.json();
  const docRef = await addDoc(collection(db, "records"), {
    ...res,
    userId: params.uid,
    timestamp: Timestamp.fromDate(new Date()),
  });
  const docSnap = await getDoc(docRef);
  return NextResponse.json({
    message: "データを追加しました",
    records: [{ id: docRef.id, document: docSnap.data() }],
  });
};

// [要修正]req.bodyで受け取る型が参照できないのでanyになる
export const PUT = async (
  req: NextRequest,
  { params }: { params: { uid: string } }
) => {
  const res = await req.json();
  const docRef = doc(db, "records", res.docId);

  // docIdで指定したdocumentのuserIdが現在のユーザと一致するときupdate
  const docSnap = await getDoc(docRef);
  const uid = docSnap.get("userId");
  if (uid == params.uid) {
    await updateDoc(docRef, {
      amount: res.amount,
      purpose: res.purpose,
    });
  } else {
    return NextResponse.json({
      message: "権限がありませんでした",
      records: null,
    });
  }
  return NextResponse.json({
    message: "データを更新しました",
    records: [{ id: docRef.id, document: (await getDoc(docRef)).data() }],
  });
};

// [要修正]req.bodyで受け取る型が参照できないのでanyになる
export const DELETE = async (
  req: NextRequest,
  { params }: { params: { uid: string } }
) => {
  const res = await req.json();
  const docRef = doc(db, "records", res.docId);

  // docIdで指定したdocumentのuserIdが現在のユーザと一致するときupdate
  const docSnap = await getDoc(docRef);
  const uid = docSnap.get("userId");
  if (uid == params.uid) {
    await deleteDoc(docRef);
  } else {
    return NextResponse.json({
      message: "権限がありませんでした",
      records: null,
    });
  }
  return NextResponse.json({
    message: "データを削除しました",
    records: [{ id: docRef.id, document: docSnap.data() }],
  });
};
