import { db, auth } from "@/app/firebase/admin";
import { PostType } from "@/app/types";
import { FieldValue } from "firebase-admin/firestore";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const idToken = request.headers.get("authorization");
  if (!idToken)
    return NextResponse.json(
      { error: "認証情報がありません" },
      { status: 401 }
    );
  try {
    const decodedToken = await auth.verifyIdToken(idToken);
    const uid = decodedToken.uid;
    const docId = params.id;
    const res = (await request.json()) as PostType;
    const docRef = db
      .collection("users")
      .doc(uid)
      .collection("records")
      .doc(docId);
    await docRef.update({
      ...res,
      updatedAt: FieldValue.serverTimestamp(),
    });
    const updatedRecordSnap = await docRef.get();
    return NextResponse.json({
      id: updatedRecordSnap.id,
      ...updatedRecordSnap.data(),
    });
  } catch (error) {
    NextResponse.json(error);
  }
};

export const DELETE = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const idToken = request.headers.get("authorization");
  if (!idToken)
    return NextResponse.json(
      { error: "認証情報がありません" },
      { status: 401 }
    );
  try {
    const decodedToken = await auth.verifyIdToken(idToken);
    const uid = decodedToken.uid;
    const docId = params.id;
    const docRef = db
      .collection("users")
      .doc(uid)
      .collection("records")
      .doc(docId);
    const deletedRecordSnap = await docRef.get();
    await docRef.delete();
    return NextResponse.json({
      id: deletedRecordSnap.id,
      ...deletedRecordSnap.data(),
    });
  } catch (error) {
    return NextResponse.json(error);
  }
};
