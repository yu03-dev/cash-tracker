import { db } from "@/firebase/admin";
import { zPostData } from "@/types";
import { getOrderedRecords } from "@/utils/firestore_query";
import { getUser } from "@/utils/session";
import { FieldValue } from "firebase-admin/firestore";
import { NextResponse, type NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  const sessionCookie = request.headers.get("Authorization");
  try {
    const { uid } = await getUser(sessionCookie!);
    const orderedRecords = await getOrderedRecords(uid);
    return NextResponse.json(orderedRecords);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};

export const POST = async (request: NextRequest) => {
  const sessionCookie = request.headers.get("Authorization");
  try {
    const { uid } = await getUser(sessionCookie!);
    const userRecordRef = db.collection("users").doc(uid).collection("records");
    const body = zPostData.parse(await request.json());
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
