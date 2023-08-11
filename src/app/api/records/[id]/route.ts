import { db } from "@/app/firebase/admin";
import { PostType } from "@/app/types";
import { FieldValue } from "firebase-admin/firestore";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const uid = "NhESkFqWjXaolAVkzyfKlgGZZFV2";
  const docId = params.id;
  const res = (await req.json()) as PostType;
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
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const uid = "NhESkFqWjXaolAVkzyfKlgGZZFV2";
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
};
