import { db } from "@/firebase/admin";
import { getUser } from "@/utils/session";
import { NextResponse, type NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  const sessionCookie = request.headers.get("Authorization");
  try {
    const { uid, name, email, picture } = await getUser(sessionCookie!);
    const userDocRef = db.collection("users").doc(uid);
    const userDocSnap = await userDocRef.get();
    return NextResponse.json({
      name,
      picture,
      email,
      ...userDocSnap.data(),
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
};
