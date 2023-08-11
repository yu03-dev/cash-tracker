import { NextRequest, NextResponse } from "next/server";
import { db, auth } from "@/app/firebase/admin";
import { PostType } from "@/app/types";
import { FieldValue } from "firebase-admin/firestore";

export const GET = async () => {
  // const idToken = req.headers.get("authorization");
  // // idTokenが存在しないという旨のmessageをjsonで返すようにする？
  // if (!idToken) return console.log("認証情報がありません");
  try {
    // const decodedToken = await auth.verifyIdToken(idToken);
    // const uid = decodedToken.uid;
    const uid = "NhESkFqWjXaolAVkzyfKlgGZZFV2";
    const userRecordRef = db.collection("users").doc(uid).collection("records");
    const snapshot = await userRecordRef.orderBy("createdAt", "desc").get();
    const records = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return NextResponse.json(records);
  } catch (error) {
    console.error(error);
  }
};

export const POST = async (req: NextRequest) => {
  const uid = "NhESkFqWjXaolAVkzyfKlgGZZFV2";
  const res = (await req.json()) as PostType;
  const userRecordRef = db.collection("users").doc(uid).collection("records");
  const postRecordRef = await userRecordRef.add({
    ...res,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  });
  const postRecordSnap = await postRecordRef.get();
  return NextResponse.json({
    id: postRecordSnap.id,
    ...postRecordSnap.data(),
  });
};
