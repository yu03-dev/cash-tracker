import { auth, db } from "@/firebase/admin";
import { PostType, RecordsType } from "@/types";
import { getUserId } from "@/utils/session";
import { FieldValue } from "firebase-admin/firestore";
import { NextResponse, type NextRequest } from "next/server";

const getOrderedRecords = async (uid: string) => {
  const userRecordRef = db.collection("users").doc(uid).collection("records");
  const snapshot = await userRecordRef.orderBy("createdAt", "desc").get();
  const records = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as RecordsType;
  return records;
};

export const GET = async (request: NextRequest) => {
  const sessionCookie = request.headers.get("Authorization");
  try {
    const uid = await getUserId(sessionCookie!);
    const orderedRecords = await getOrderedRecords(uid);
    return NextResponse.json(orderedRecords);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};

export const POST = async (request: NextRequest) => {
  const sessionCookie = request.headers.get("Authorization");
  try {
    const uid = await getUserId(sessionCookie!);
    const userRecordRef = db.collection("users").doc(uid).collection("records");
    const body = (await request.json()) as PostType;
    await userRecordRef.add({
      ...body,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    });
    return NextResponse.json({
      message: "New record is successfully posted!",
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
