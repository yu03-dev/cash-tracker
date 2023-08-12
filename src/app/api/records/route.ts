import { NextRequest, NextResponse } from "next/server";
import { db, auth } from "@/app/firebase/admin";
import { PostType } from "@/app/types";
import { FieldValue } from "firebase-admin/firestore";

export const GET = async (request: NextRequest) => {
  const idToken = request.headers.get("authorization");
  if (!idToken)
    return NextResponse.json(
      { error: "認証情報がありません" },
      { status: 401 }
    );
  try {
    const decodedToken = await auth.verifyIdToken(idToken);
    const uid = decodedToken.uid;
    const userRecordRef = db.collection("users").doc(uid).collection("records");
    const snapshot = await userRecordRef.orderBy("createdAt", "desc").get();
    const records = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return NextResponse.json(records);
  } catch (error) {
    return NextResponse.json(error);
  }
};

export const POST = async (request: NextRequest) => {
  const idToken = request.headers.get("authorization");
  if (!idToken)
    return NextResponse.json(
      { error: "認証情報がありません" },
      { status: 401 }
    );
  try {
    const decodedToken = await auth.verifyIdToken(idToken);
    const uid = decodedToken.uid;
    const userRecordRef = db.collection("users").doc(uid).collection("records");
    const res = (await request.json()) as PostType;
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
  } catch (error) {
    return NextResponse.json(error);
  }
};
