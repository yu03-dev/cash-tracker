import { db } from "@/firebase/admin";
import { PostType } from "@/types";
import { getUserId } from "@/utils/session";
import { FieldValue } from "firebase-admin/firestore";
import { NextResponse, type NextRequest } from "next/server";

export const PUT = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const sessionCookie = request.headers.get("Authorization");
  try {
    const uid = await getUserId(sessionCookie!);
    const docId = params.id;
    const body = (await request.json()) as PostType;
    const docRef = db
      .collection("users")
      .doc(uid)
      .collection("records")
      .doc(docId);
    await docRef.update({
      ...body,
      updatedAt: FieldValue.serverTimestamp(),
    });
    return NextResponse.json({
      message: "Record is successfully updated!",
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};

export const DELETE = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const sessionCookie = request.headers.get("Authorization");
  try {
    const uid = await getUserId(sessionCookie!);
    const docId = params.id;
    const docRef = db
      .collection("users")
      .doc(uid)
      .collection("records")
      .doc(docId);
    await docRef.delete();
    return NextResponse.json({
      message: "Record is successfully deleted!",
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
